package Expense_tracker.Exptracker.config;



import jakarta.servlet.*;
import jakarta.servlet.http.*;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import Expense_tracker.Exptracker.model.User;
import Expense_tracker.Exptracker.repository.UserRepository;
import Expense_tracker.Exptracker.service.JwtService;

import java.io.IOException;

import java.util.List;


@Component
public class JwtFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserRepository userRepository;

    public JwtFilter(JwtService jwtService, UserRepository userRepository) {
        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {
        System.out.println("AUTH HEADER = " + request.getHeader("Authorization"));

        String path = request.getServletPath();

    // ✅ SKIP JWT CHECK FOR AUTH
    if (path.startsWith("/auth")) {
        filterChain.doFilter(request, response);
        return;
    }

        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = authHeader.substring(7);

        if (!jwtService.validateToken(token)) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid JWT");
            return;
        }

        String email = jwtService.extractEmail(token);
        System.out.println("JWT EMAIL = " + email);

        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "User not found");
            return;
        }

        // 🔥 THIS IS WHAT YOU WERE MISSING 🔥
        UsernamePasswordAuthenticationToken authentication =
                new UsernamePasswordAuthenticationToken(
                        user,
                        null,
                        List.of(new SimpleGrantedAuthority("ROLE_USER")) // no roles for now
                );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        System.out.println("AUTH SET: " + SecurityContextHolder.getContext().getAuthentication());


        filterChain.doFilter(request, response);
    }
}

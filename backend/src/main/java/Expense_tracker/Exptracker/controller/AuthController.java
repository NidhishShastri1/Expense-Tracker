package Expense_tracker.Exptracker.controller;



import org.springframework.web.bind.annotation.*;

import Expense_tracker.Exptracker.model.User;
import Expense_tracker.Exptracker.service.JwtService;
import Expense_tracker.Exptracker.service.UserService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;
    private final JwtService jwtService;

    public AuthController(UserService userService, JwtService jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userService.register(user);
    }

    @PostMapping("/login")
    public String login(@RequestBody User user) {
        User u = userService.authenticate(user.getEmail(), user.getPassword());
        return jwtService.generateToken(u.getEmail());
    }
}

package Expense_tracker.Exptracker.service;


import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import Expense_tracker.Exptracker.exception.UnauthorizedException;
import Expense_tracker.Exptracker.model.User;
import Expense_tracker.Exptracker.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository repo;
    private final PasswordEncoder encoder;

    public UserService(UserRepository repo, PasswordEncoder encoder) {
        this.repo = repo;
        this.encoder = encoder;
    }

    public User register(User user) {
        user.setPassword(encoder.encode(user.getPassword()));
        return repo.save(user);
    }

    public User authenticate(String email, String password) {
        User user = repo.findByEmail(email)
                .orElseThrow(() -> new UnauthorizedException("Invalid email"));

        if (!encoder.matches(password, user.getPassword()))
            throw new UnauthorizedException("Invalid password");

        return user;
    }
}


package Expense_tracker.Exptracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import Expense_tracker.Exptracker.model.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}

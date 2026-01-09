
package Expense_tracker.Exptracker.repository;


import org.springframework.data.jpa.repository.*;

import Expense_tracker.Exptracker.model.Transaction;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    List<Transaction> findByUserId(Long userId);

    @Query("SELECT SUM(t.amount) FROM Transaction t WHERE t.user.id=:userId AND t.type='EXPENSE'")
    Double totalExpense(Long userId);

    @Query("SELECT SUM(t.amount) FROM Transaction t WHERE t.user.id=:userId AND t.type='INCOME'")
    Double totalIncome(Long userId);
}

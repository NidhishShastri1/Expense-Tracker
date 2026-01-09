package Expense_tracker.Exptracker.service;



import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import Expense_tracker.Exptracker.model.Transaction;
import Expense_tracker.Exptracker.model.User;
import Expense_tracker.Exptracker.repository.TransactionRepository;


import java.util.List;
@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;

    public TransactionService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    public Transaction add(Transaction t) {
        User user = (User) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();

        t.setUser(user);
        return transactionRepository.save(t);
    }

    public List<Transaction> getMyTransactions() {
        User user = (User) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();

        return transactionRepository.findByUserId(user.getId());
    }

    public void delete(Long id) {
        transactionRepository.deleteById(id);
    }
}


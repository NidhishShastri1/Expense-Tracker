package Expense_tracker.Exptracker.controller;


import org.springframework.web.bind.annotation.*;

import Expense_tracker.Exptracker.repository.TransactionRepository;

@RestController
@RequestMapping("/analytics")
public class AnalyticsController {

    private final TransactionRepository repo;

    public AnalyticsController(TransactionRepository repo) {
        this.repo = repo;
    }

    @GetMapping("/summary/{userId}")
    public String summary(@PathVariable Long userId) {
        Double income = repo.totalIncome(userId);
        Double expense = repo.totalExpense(userId);
        return "Income: " + income + ", Expense: " + expense;
    }
}

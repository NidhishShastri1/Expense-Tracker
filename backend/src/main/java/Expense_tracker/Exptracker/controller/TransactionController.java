package Expense_tracker.Exptracker.controller;



import org.springframework.web.bind.annotation.*;

import Expense_tracker.Exptracker.model.Transaction;
import Expense_tracker.Exptracker.service.TransactionService;


import java.util.List;

@RestController
@RequestMapping("/transactions")
public class TransactionController {

    private final TransactionService service;

    public TransactionController(TransactionService service) {
        this.service = service;
    }

    @PostMapping
    public Transaction add(@RequestBody Transaction t) {
        return service.add(t);
    }

    @GetMapping("/me")
    public List<Transaction> myTransactions() {
        return service.getMyTransactions();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}




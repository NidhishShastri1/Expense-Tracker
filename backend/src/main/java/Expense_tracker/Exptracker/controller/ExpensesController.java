package Expense_tracker.Exptracker.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@RestController
@RequestMapping("/expenses")
public class ExpensesController {
    @GetMapping
    public String test() {
        return "Expenses working";
    }
    
}

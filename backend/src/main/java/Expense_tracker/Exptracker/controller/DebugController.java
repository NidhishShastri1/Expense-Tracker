package Expense_tracker.Exptracker.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DebugController {
    
     @GetMapping("/debug")
    public String debug() {
        return "SECURITY OK";
    }
}

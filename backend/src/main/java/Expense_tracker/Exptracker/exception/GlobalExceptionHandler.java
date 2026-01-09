package Expense_tracker.Exptracker.exception;

import org.springframework.web.bind.annotation.*;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(RuntimeException.class)
    public String handle(RuntimeException e) {
        return e.getMessage();
    }
}

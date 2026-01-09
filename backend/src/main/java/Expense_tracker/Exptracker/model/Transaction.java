package Expense_tracker.Exptracker.model;

import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double amount;

    private String type; // INCOME / EXPENSE

    private String category;

    @Column(nullable = false)
    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate date;


    private String note;

    @ManyToOne
    private User user;

     @PrePersist
    public void prePersist() {
        if (date == null) {
            date = LocalDate.now();
        }
    }
}

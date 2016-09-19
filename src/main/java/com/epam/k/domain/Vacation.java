package com.epam.k.domain;

import com.epam.k.domain.enums.VacationStatus;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@Document
public class Vacation {
    @Id
    private String id;
    private User owner;
    private List<User> members;
    private String title;
    private String description;
    private LocalDate beginDate;
    private LocalDate endDate;
    private List<Tag> tags;
    private BigDecimal estimatedCost;
    private int minMembers;
    private VacationStatus status;
    private List<Activity> plannedActivities;
    private List<Comment> comments;
    private List<Image> gallery;
}

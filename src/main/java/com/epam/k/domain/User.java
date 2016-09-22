package com.epam.k.domain;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@Document
public class User extends Principal {
    private String firstName;
    private String lastName;
    private String skype;
    private String phone;
    private Image avatar;
}

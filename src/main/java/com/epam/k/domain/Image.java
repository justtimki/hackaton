package com.epam.k.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.net.URI;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document
public class Image {
    private String id;
    private URI uri;
    private String description;
}

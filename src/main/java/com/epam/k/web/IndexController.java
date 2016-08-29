package com.epam.k.web;

import java.util.ArrayList;
import java.util.List;

import org.bson.Document;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.epam.k.service.ExampleService;


@RestController
public class IndexController {
    private static final Logger LOG = LoggerFactory.getLogger(IndexController.class);

    @Autowired
    private ExampleService exampleService;

    @RequestMapping(value = "/")
    public String view() {
        List<Document> documents = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
            documents.add(new Document("name", i));
        }
        exampleService.insertMany(documents);
        exampleService.find().forEach(it -> LOG.info(it.toJson()));
        return "Hello world!!!";
    }
}

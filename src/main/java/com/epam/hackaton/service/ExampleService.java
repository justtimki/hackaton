package com.epam.hackaton.service;

import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import static com.mongodb.client.model.Filters.eq;

@Service
public class ExampleService extends BaseMongoService {

    private static final String MONGO_COLLECTION = "examleCollection";

    @Autowired
    public ExampleService(MongoDatabase mongoDatabase) {
        super(mongoDatabase, MONGO_COLLECTION);
    }
}

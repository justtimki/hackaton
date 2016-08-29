package com.epam.k.service;

import com.mongodb.client.MongoDatabase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ExampleService extends BaseMongoService {

    private static final String MONGO_COLLECTION = "examleCollection";

    @Autowired
    public ExampleService(MongoDatabase mongoDatabase) {
        super(mongoDatabase, MONGO_COLLECTION);
    }
}

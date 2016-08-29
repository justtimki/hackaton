package com.epam.k.service;

import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService extends BaseMongoService {

    private static final String MONGO_COLLECTION = "user";

    @Autowired
    public UserService(MongoDatabase mongoDatabase) {
        super(mongoDatabase, MONGO_COLLECTION);
    }

    @Override
    public void initCollection() {
        mongoCollection.createIndex(new Document("username", 1));
    }
}

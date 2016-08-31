package com.epam.k.service;

import com.epam.k.domain.User;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VacationService extends BaseMongoService {
    private static final String MONGO_COLLECTION = "vacation";

    public VacationService(MongoDatabase mongoDatabase) {
        super(mongoDatabase, MONGO_COLLECTION);
    }

    @SuppressWarnings("unchecked")
    public List<User> getUsers(Document vacation) {
        return vacation.get("users", List.class);
    }
}
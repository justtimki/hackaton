package com.epam.k.service;

import com.mongodb.client.MongoDatabase;
import org.springframework.stereotype.Service;

@Service
public class VacationService extends BaseMongoService {
    private static final String MONGO_COLLECTION = "vacation";

    public VacationService(MongoDatabase mongoDatabase) {
        super(mongoDatabase, MONGO_COLLECTION);
    }
}
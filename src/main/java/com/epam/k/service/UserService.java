package com.epam.k.service;

import com.epam.k.domain.User;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.IndexOptions;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.mongodb.client.model.Filters.eq;

@Service
public class UserService extends BaseMongoService {

    private static final String MONGO_COLLECTION = "user";

    @Autowired
    public UserService(MongoDatabase mongoDatabase) {
        super(mongoDatabase, MONGO_COLLECTION);
    }

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void initCollection() {
        mongoCollection.createIndex(new Document("username", 1), new IndexOptions().unique(true));
    }

    public User findByUsername(String username) {
        Document document = username == null ? null : mongoCollection.find(eq("username", username.toLowerCase())).first();
        return document == null ? null : new User(document);
    }

    @SuppressWarnings("unchecked")
    public List<Document> getVacations(Document user) {
        return user.get("vacations", List.class);
    }

    public void setUsername(Document user, String username) {
        user.put("username", username);
    }

    public void setPassword(Document user, String password) {
        user.put("passwordHash", passwordEncoder.encode(password));
    }
}

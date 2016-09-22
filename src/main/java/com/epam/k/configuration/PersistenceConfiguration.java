package com.epam.k.configuration;

import com.mongodb.MongoClient;
import com.mongodb.client.MongoDatabase;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@Configuration
@EnableMongoRepositories(basePackages = {"com.epam.k.dao"})
public class PersistenceConfiguration {

    @Value("${mongodb.name}")
    private String mongoDb;

    @Bean
    public MongoDatabase database(MongoClient client) {
        return client.getDatabase(mongoDb);
    }
}

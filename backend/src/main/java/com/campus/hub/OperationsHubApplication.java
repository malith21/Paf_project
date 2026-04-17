package com.campus.hub;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

@SpringBootApplication
@EnableMongoAuditing
public class OperationsHubApplication {

    public static void main(String[] args) {
        SpringApplication.run(OperationsHubApplication.class, args);
    }

    @Bean
    public CommandLineRunner initDatabase(MongoTemplate mongoTemplate) {
        return args -> {
            // MongoDB lazily creates databases. By explicitly checking or creating a collection 
            // here on startup, we force the the database to be visible in the MongoDB Atlas Cluster.
            if (!mongoTemplate.collectionExists("startup_logs")) {
                mongoTemplate.createCollection("startup_logs");
                System.out.println("Database and 'startup_logs' collection created in cluster.");
            }
        };
    }
}

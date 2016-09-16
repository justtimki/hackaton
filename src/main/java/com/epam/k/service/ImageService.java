package com.epam.k.service;

import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ImageService extends BaseMongoService {
    private static final String MONGO_COLLECTION = "image";

    @Autowired
    public ImageService(MongoDatabase mongoDatabase) {
        super(mongoDatabase, MONGO_COLLECTION);
    }

    public String getAlt(Document image) {
        return image.getString("alt");
    }

    public void setAlt(Document image, String alt) {
        image.put("alt", alt);
    }

    public String getExt(Document image) {
        return image.getString("ext");
    }

    public void setExt(Document image, String ext) {
        image.put("ext", ext);
    }
}

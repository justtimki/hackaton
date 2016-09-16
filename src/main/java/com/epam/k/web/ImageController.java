package com.epam.k.web;

import com.epam.k.service.ImageService;
import org.bson.Document;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.nio.file.Paths;

import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RestController
public class ImageController {
    private static final Logger LOG = LoggerFactory.getLogger(ImageController.class);

    @Autowired
    private ImageService imageService;

    @Value("${uploadDir}")
    private String uplaodDir;

    @RequestMapping(value = "/upload", method = POST)
    public String uploadImage(@RequestParam("image") MultipartFile file) {
        Document image = new Document();
        imageService.setAlt(image, file.getName());
        imageService.insertOne(image);
        upload(file, imageService.getMongoId(image).toString());
        return imageService.getMongoId(image).toString();
    }

    private void upload(MultipartFile file, String fileName) {
        try {
            String filePath = Paths.get(uplaodDir, fileName).toString();

            BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(new File(filePath)));
            stream.write(file.getBytes());
            stream.close();
        } catch (Exception e) {
            LOG.error("Upload error", e);
        }
    }
}

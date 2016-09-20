package com.epam.k.service;

import com.epam.k.dao.ImageDAO;
import com.epam.k.domain.Image;
import org.bson.Document;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ImageService {

    private static final Logger LOG = LoggerFactory.getLogger(ImageService.class);

    @Autowired
    private ImageDAO imageDAO;

    public Image save(final Image image){
        LOG.debug("Saving image with name {} to DB", image.getAltText());
        return imageDAO.save(image);
    }

    public Image findById(final String id) {
        LOG.debug("Request to find image with id {}", id);
        return imageDAO.findOne(id);
    }
}

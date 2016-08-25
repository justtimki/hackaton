package com.epam.hackaton.web;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class IndexController {
    private static final Logger LOG = LoggerFactory.getLogger(IndexController.class);

    @RequestMapping(value = "/")
    public String view() {
        LOG.info("Hello world!!!");
        return "Hello world!!!";
    }
}

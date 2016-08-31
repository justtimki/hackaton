package com.epam.k.web;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class IndexController {

    @RequestMapping(value = "/")
    public String view() {
        return "Hello world!!!";
    }
}

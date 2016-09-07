package com.epam.k.web;

import com.epam.k.service.UserService;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RestController
public class RegistrationController {

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/register", method = POST, consumes = APPLICATION_JSON_VALUE)
    public String register(@RequestBody Document doc) {
        Document user = new Document();
        userService.setUsername(user, doc.getString("username"));
        userService.setPassword(user, doc.getString("password"));
        userService.insertOne(user);
        return "index";
    }
}

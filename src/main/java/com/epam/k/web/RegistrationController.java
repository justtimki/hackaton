package com.epam.k.web;

import com.epam.k.service.UserService;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RegistrationController {

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/register", method = RequestMethod.POST, consumes="application/json")
    public String register(@RequestBody Document doc) {
        Document user = new Document();
        userService.setUsername(user, doc.getString("username"));
        userService.setPassword(user, doc.getString("password"));
        userService.insertOne(user);
        return "index";
    }
}

package com.epam.k.web;

import com.epam.k.service.VacationService;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@RestController
public class VacationController {

    @Autowired
    private VacationService vacationService;

    @RequestMapping(value = "/vacations", method = GET)
    public Document list() {
        return new Document("vacations", vacationService.find());
    }
}

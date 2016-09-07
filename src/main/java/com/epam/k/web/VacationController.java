package com.epam.k.web;

import com.epam.k.service.VacationService;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@RestController
public class VacationController {

    @Autowired
    private VacationService vacationService;

    @RequestMapping(value = "/vacation/list", method = GET)
    public Document list() {
        return new Document("vacations", vacationService.find());
    }

    @RequestMapping(value = "/vacation/{id}", method = GET)
    public Document find(@PathVariable("id") String id) {
        return vacationService.findById(id);
    }
}

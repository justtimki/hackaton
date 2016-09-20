package com.epam.k.web;

import com.epam.k.domain.Vacation;
import com.epam.k.service.UserService;
import com.epam.k.service.VacationService;
import org.bson.Document;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@RestController
public class VacationController {

    private final static Logger LOG = LoggerFactory.getLogger(VacationController.class);

    @Autowired
    private VacationService vacationService;

    @RequestMapping(value = "/vacations", method = GET)
    public Page<Vacation> list(final Pageable pageable) {
        LOG.debug("Request to find all vacations");
        return vacationService.getVacations(pageable);
    }

    @RequestMapping(value = "/vacation/{id}", method = GET)
    public HttpEntity<Vacation> find(@PathVariable("id") final String id) {
        LOG.debug("Request to find Vacation with id {}", id);
        return new HttpEntity<>(vacationService.findById(id));
    }
}

package com.epam.k.service;

import com.epam.k.dao.VacationDAO;
import com.epam.k.domain.Vacation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class VacationService {

    private final static Logger LOG = LoggerFactory.getLogger(VacationService.class);

    @Autowired
    private VacationDAO vacationDAO;

    public Page<Vacation> getVacations(final Pageable pageable) {
        LOG.debug("Request to find all vacations");
        return vacationDAO.findAll(pageable);
    }
}
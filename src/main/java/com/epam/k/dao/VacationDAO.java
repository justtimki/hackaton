package com.epam.k.dao;

import com.epam.k.domain.Vacation;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface VacationDAO extends PagingAndSortingRepository<Vacation, String> {
}

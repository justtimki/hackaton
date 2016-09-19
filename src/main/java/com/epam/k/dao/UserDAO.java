package com.epam.k.dao;

import com.epam.k.domain.User;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface UserDAO extends PagingAndSortingRepository<User, String>{

    User findByUsername(String username);
}

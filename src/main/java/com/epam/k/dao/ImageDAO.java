package com.epam.k.dao;

import com.epam.k.domain.Image;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface ImageDAO extends PagingAndSortingRepository<Image, String> {
}

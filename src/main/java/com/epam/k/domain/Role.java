package com.epam.k.domain;

import org.springframework.security.core.GrantedAuthority;

public enum Role implements GrantedAuthority {

    ROLE_ANONYMOUS,
    ROLE_GENERIC_USER,
    ROLE_USER,
    ROLE_ADMIN;

    @Override
    public String getAuthority() {
        return name();
    }
}

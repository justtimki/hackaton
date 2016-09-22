package com.epam.k.domain;

import com.epam.k.domain.enums.Role;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Set;

public abstract class Principal implements UserDetails {
    @Id
    private String id;
    private String username;
    private String passwordHash;
    @Getter
    @Setter
    private Set<Role> authorities;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    @JsonIgnore
    public String getPassword() {
        return passwordHash;
    }

    public Principal setPassword(final String passwordHash) {
        this.passwordHash = passwordHash;
        return this;
    }

    @Override
    public String getUsername() {
        return username;
    }

    public Principal setUsername(final String username) {
        this.username = username.toLowerCase();
        return this;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}

package com.epam.k.service;

import com.epam.k.dao.UserDAO;
import com.epam.k.domain.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final static Logger LOG = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserDAO userDAO;

    public void save(final User user) {
        LOG.debug("Saving user '{}'", user.getUsername());
        userDAO.save(user);
    }

    public User findByUsername(final String username) {
        LOG.debug("Requesting user '{}' from DB", username);
        if (username == null) {
            return null;
        }
        return userDAO.findByUsername(username);
    }

    public void setEncodedPassword(final User user, final String password) {
        LOG.debug("Setting encoded password to user '{}'", user);
        user.setPassword(passwordEncoder.encode(password));
    }

    public void updateUserPassword(final User user, final String password) {
        LOG.debug("Updating user '{}' password", user);
        user.setPassword(passwordEncoder.encode(password));
        userDAO.save(user);
    }
}

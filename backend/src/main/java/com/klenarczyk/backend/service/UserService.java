package com.klenarczyk.backend.service;

import com.klenarczyk.backend.entity.User;
import com.klenarczyk.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Methods
    public User createUser(User user) {
        return userRepository.save(user);
    }
}
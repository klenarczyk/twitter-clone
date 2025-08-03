package com.klenarczyk.backend.service;

import com.klenarczyk.backend.dto.user.CreateUserRequest;
import com.klenarczyk.backend.entity.User;
import com.klenarczyk.backend.exception.ResourceNotFoundException;
import com.klenarczyk.backend.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Methods
    public User createUser(@Valid CreateUserRequest req) {
        User created = new User();

        created.setHandle(req.getHandle());
        created.setEmail(req.getEmail());
        created.setPasswordHash(req.getPassword());
        created.setFullName(req.getFullName());
        created.setBio(req.getBio());

        return userRepository.save(created);
    }

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User with id #" + id + " not found"));
    }

}
package com.klenarczyk.backend.service;

import com.klenarczyk.backend.dto.auth.RegisterRequest;
import com.klenarczyk.backend.dto.users.UpdateUserRequest;
import com.klenarczyk.backend.model.User;
import com.klenarczyk.backend.common.exception.BadRequestException;
import com.klenarczyk.backend.common.exception.ResourceNotFoundException;
import com.klenarczyk.backend.repository.UserRepository;
import com.klenarczyk.backend.service.impl.UserServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserServiceImpl userService;

    // Common test data
    private RegisterRequest registerRequest;
    private User user;

    @BeforeEach
    void setup() {
        registerRequest = new RegisterRequest();
        registerRequest.setEmail("test@example.com");
        registerRequest.setPassword("password");
        registerRequest.setHandle("testuser");
        registerRequest.setFullName("Test User");

        user = new User();
        user.setEmail(registerRequest.getEmail());
        user.setHandle(registerRequest.getHandle());
        user.setFullName(registerRequest.getFullName());
        user.setPasswordHash("encodedPassword");
    }

    @Test
    void createUser_encodesPasswordOnCreation() {
        when(passwordEncoder.encode(registerRequest.getPassword())).thenReturn("encodedPassword");
        when(userRepository.save(any(User.class))).thenReturn(user);

        User created = userService.createUser(registerRequest);

        assertEquals("encodedPassword", created.getPasswordHash());
        verify(passwordEncoder).encode(registerRequest.getPassword());
        verify(userRepository).save(any(User.class));
    }

    @Test
    void createUser_throwsWhenEmailAlreadyExists() {
        when(userRepository.findByEmail(registerRequest.getEmail())).thenReturn(Optional.of(user));

        assertThrows(BadRequestException.class, () -> userService.createUser(registerRequest));
    }

    @Test
    void createUser_throwsWhenHandleAlreadyExists() {
        when(userRepository.findByHandle(registerRequest.getHandle())).thenReturn(Optional.of(user));

        assertThrows(BadRequestException.class, () -> userService.createUser(registerRequest));
    }

    @Test
    void updateUser_updatesOnlyChangedFields() {
        Long userId = 1L;
        UpdateUserRequest req = new UpdateUserRequest();
        req.setFullName("Updated Name");
        req.setBio("New bio");

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(userRepository.save(any(User.class))).thenReturn(user);

        User updated = userService.updateUser(userId, req);

        assertEquals("Updated Name", updated.getFullName());
        assertEquals("testuser", updated.getHandle()); // Unchanged
        assertEquals("New bio", updated.getBio());
        verify(userRepository).save(user);
    }

    @Test
    void updateUser_doesNotCallSaveWhenNoChanges() {
        Long userId = 1L;
        UpdateUserRequest req = new UpdateUserRequest();
        req.setFullName(user.getFullName()); // Unchanged

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));

        User updated = userService.updateUser(userId, req);

        assertEquals(user.getFullName(), updated.getFullName());
        verify(userRepository).findById(userId);
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void updateUser_throwsWhenNotFound() {
        Long userId = 1L;
        UpdateUserRequest req = new UpdateUserRequest();

        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> userService.updateUser(userId, req));
    }

    @Test
    void getUserById_throwsWhenNotFound() {
        Long userId = 1L;
        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> userService.getUserById(userId));
    }

}
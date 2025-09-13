package com.klenarczyk.backend.service;

import com.klenarczyk.backend.security.auth.dto.RegisterRequest;
import com.klenarczyk.backend.dto.users.UpdateUserRequest;
import com.klenarczyk.backend.model.Follow;
import com.klenarczyk.backend.model.User;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface UserService {

    User createUser(@Valid RegisterRequest req);

    void deleteUser(UserDetails currentUser);

    User updateUser(UserDetails currentUser, @Valid UpdateUserRequest req);

    User getAuthenticatedUser(UserDetails principal);

    User getUserById(Long id);

    User getUserByEmail(String email);

    User getUserByHandle(String handle);

    Page<User> searchUsers(String query, Pageable pageable);

    List<User> getFollowers(Long userId);

    List<User> getFollowing(Long userId);

    String uploadUserImage(UserDetails currentUser, MultipartFile file);

    List<Long> getFollowedUserIds(Long userId);

    boolean doesUserExist(Long id);

    boolean isEmailTaken(String email);

    boolean isHandleTaken(String handle);

}

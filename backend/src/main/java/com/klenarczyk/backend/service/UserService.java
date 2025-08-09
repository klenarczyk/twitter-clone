package com.klenarczyk.backend.service;

import com.klenarczyk.backend.dto.auth.RegisterRequest;
import com.klenarczyk.backend.dto.user.UpdateUserRequest;
import com.klenarczyk.backend.entity.Follow;
import com.klenarczyk.backend.entity.User;
import jakarta.validation.Valid;

import java.util.List;

public interface UserService {

    User createUser(@Valid RegisterRequest req);

    User updateUser(Long id, @Valid UpdateUserRequest req);

    User getUserById(Long id);

    User getUserByEmail(String email);

    User getUserByHandle(String handle);

    List<User> getFollowers(Long userId);

    List<User> getFollowing(Long userId);

    Follow createFollow(Long followedId, Long followerId);

    void deleteFollow(Long followedId, Long followerId);

    boolean doesUserExist(Long id);

    boolean isEmailTaken(String email);

    boolean isHandleTaken(String handle);

}

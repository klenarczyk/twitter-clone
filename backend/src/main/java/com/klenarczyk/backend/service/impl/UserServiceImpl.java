package com.klenarczyk.backend.service.impl;

import com.klenarczyk.backend.security.auth.dto.RegisterRequest;
import com.klenarczyk.backend.dto.users.UpdateUserRequest;
import com.klenarczyk.backend.model.Follow;
import com.klenarczyk.backend.model.FollowId;
import com.klenarczyk.backend.model.User;
import com.klenarczyk.backend.common.exception.ConflictException;
import com.klenarczyk.backend.common.exception.ResourceNotFoundException;
import com.klenarczyk.backend.repository.FollowRepository;
import com.klenarczyk.backend.repository.UserRepository;
import com.klenarczyk.backend.service.UserService;
import com.klenarczyk.backend.common.util.Util;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final FollowRepository followRepository;

    private final StorageServiceImpl storageService;

    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder,
                           FollowRepository followRepository, StorageServiceImpl storageService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.followRepository = followRepository;
        this.storageService = storageService;
    }

    // Methods
    @Override
    @Transactional
    public User createUser(@Valid RegisterRequest req) {
        if (isEmailTaken(req.getEmail())) {
            throw new ConflictException("email", "Email '" + req.getEmail() + "' is already in use");
        }
        if (isHandleTaken(req.getHandle())) {
            throw new ConflictException("handle", "Handle '@" + req.getHandle() + "' is already taken");
        }

        User newUser = new User();

        newUser.setHandle(req.getHandle());
        newUser.setEmail(req.getEmail());
        newUser.setPasswordHash(passwordEncoder.encode(req.getPassword()));
        newUser.setFullName(req.getFullName());

        return userRepository.save(newUser);
    }

    @Override
    @Transactional
    public User updateUser(UserDetails currentUser, @Valid UpdateUserRequest req) {
        User user = getAuthenticatedUser(currentUser);
        boolean changed = false;

        if (Util.isNotBlankAndDifferent(req.getHandle(), user.getHandle()) && !isHandleTaken(req.getHandle())) {
            user.setHandle(req.getHandle());
            changed = true;
        }
        if (Util.isNotBlankAndDifferent(req.getEmail(), user.getEmail()) && !isEmailTaken(req.getEmail())) {
            user.setEmail(req.getEmail());
            changed = true;
        }
        if (Util.isNotBlankAndDifferent(req.getFullName(), user.getFullName())) {
            user.setFullName(req.getFullName());
            changed = true;
        }
        if (Util.isDifferent(req.getBio(), user.getBio())) {
            user.setBio(req.getBio());
            changed = true;
        }

        return changed ? userRepository.save(user) : user;
    }

    @Override
    @Transactional(readOnly = true)
    public User getAuthenticatedUser(UserDetails principal) {
        if (principal == null) return null;

        return userRepository.findByEmail(principal.getUsername())
                .orElseThrow(() -> new AuthenticationCredentialsNotFoundException(
                        "Authenticated user not found"
                ));
    }

    @Override
    @Transactional(readOnly = true)
    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User with id #" + id + " not found"));
    }

    @Override
    @Transactional(readOnly = true)
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User with email " + email + " not found"));
    }

    @Override
    @Transactional(readOnly = true)
    public User getUserByHandle(String handle) {
        return userRepository.findByHandle(handle)
                .orElseThrow(() -> new ResourceNotFoundException("User with handle @" + handle + " not found"));
    }

    @Override
    public Page<User> searchUsers(String query, Pageable pageable) {
        if (query == null || query.trim().isEmpty()) {
            return Page.empty(pageable);
        }
        return userRepository.findByHandleContainingIgnoreCaseOrFullNameContainingIgnoreCase(
                query, query, pageable
        );
    }

    @Override
    @Transactional(readOnly = true)
    public List<User> getFollowers(Long userId) {
        List<Follow> followers = followRepository.findFollowsByFollowedId(userId);
        return followers.stream()
                .map(Follow::getFollower)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<User> getFollowing(Long userId) {
        List<Follow> following = followRepository.findFollowsByFollowerId(userId);
        return following.stream()
                .map(Follow::getFollowed)
                .toList();
    }

    @Override
    @Transactional
    public String uploadUserImage(UserDetails currentUser, MultipartFile file) {
        User user = getAuthenticatedUser(currentUser);
        String imageUrl = storageService.uploadProfileImage(file, user);

        user.setImageUrl(imageUrl);
        return userRepository.saveAndFlush(user).getImageUrl();
    }

    @Override
    @Transactional
    public Follow createFollow(Long followedId, Long followerId) {
        User followed = getUserById(followedId);
        User follower = getUserById(followerId);

        Follow follow = new Follow(follower, followed);
        return followRepository.save(follow);
    }

    @Override
    @Transactional
    public void deleteFollow(Long followedId, Long followerId) {
        Follow follow = followRepository.findById(new FollowId(followedId, followerId))
                .orElseThrow(() -> new ResourceNotFoundException("Follow relationship not found"));
        followRepository.delete(follow);
    }

    @Override
    @Transactional(readOnly = true)
    public boolean doesUserExist(Long id) {
        return userRepository.existsById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public boolean isEmailTaken(String email) {
        return userRepository.findByEmail(email).isPresent();
    }

    @Override
    @Transactional(readOnly = true)
    public boolean isHandleTaken(String handle) {
        return userRepository.findByHandle(handle).isPresent();
    }

}
package com.klenarczyk.backend.service.impl;

import com.klenarczyk.backend.common.exception.ConflictException;
import com.klenarczyk.backend.common.exception.ResourceNotFoundException;
import com.klenarczyk.backend.model.Follow;
import com.klenarczyk.backend.model.FollowId;
import com.klenarczyk.backend.model.User;
import com.klenarczyk.backend.repository.FollowRepository;
import com.klenarczyk.backend.repository.UserRepository;
import com.klenarczyk.backend.service.FollowService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class FollowServiceImpl implements FollowService {

    private final FollowRepository followRepository;
    private final UserServiceImpl userService;
    private final UserRepository userRepository;

    public FollowServiceImpl(FollowRepository followRepository, UserServiceImpl userService, UserRepository userRepository) {
        this.followRepository = followRepository;
        this.userService = userService;
        this.userRepository = userRepository;
    }

    //Methods
    @Override
    @Transactional(readOnly = true)
    public Follow getFollowByFollowerAndFollowing(Long followerId, Long followingId) {
        return followRepository.findById(new FollowId(followerId, followingId))
                .orElseThrow(() -> new ResourceNotFoundException("Follow not found"));
    }

    @Override
    @Transactional
    public Follow createFollow(UserDetails currentUser, Long userId) {
        User user = userService.getAuthenticatedUser(currentUser);
        User toBeFollowed = userService.getUserById(userId);

        if (user.getId().equals(toBeFollowed.getId())) {
            throw new ConflictException("self-follow", "You cannot follow yourself");
        }

        if (!isUserFollowing(user.getId(), userId)) {
            Follow follow = new Follow(user, toBeFollowed);

            user.setFollowingCount(user.getFollowingCount() + 1);
            toBeFollowed.setFollowerCount(toBeFollowed.getFollowerCount() + 1);

            userRepository.save(user);
            userRepository.save(toBeFollowed);

            return followRepository.save(follow);
        } else {
            throw new ConflictException("follow", "You are already following this user");
        }
    }

    @Override
    @Transactional
    public void deleteFollow(UserDetails currentUser, Long userId) {
        User user = userService.getAuthenticatedUser(currentUser);
        User toBeUnfollowed = userService.getUserById(userId);

        if (isUserFollowing(user.getId(), userId)) {
            Follow follow = followRepository.findById(new FollowId(user.getId(), userId))
                    .orElseThrow(() -> new ResourceNotFoundException("Follow relationship not found"));

            user.setFollowingCount(user.getFollowingCount() - 1);
            toBeUnfollowed.setFollowerCount(toBeUnfollowed.getFollowerCount() - 1);

            userRepository.save(user);
            userRepository.save(toBeUnfollowed);

            followRepository.delete(follow);
        }
    }

    @Override
    @Transactional(readOnly = true)
    public boolean isUserFollowing(Long followerId, Long followingId) {
        return followRepository.existsById(new FollowId(followerId, followingId));
    }

}

package com.klenarczyk.backend.service;

import com.klenarczyk.backend.model.Follow;
import org.springframework.security.core.userdetails.UserDetails;

public interface FollowService {

    Follow getFollowByFollowerAndFollowing(Long followerId, Long followingId);

    Follow createFollow(UserDetails currentUser, Long userId);

    void deleteFollow(UserDetails currentUser, Long userId);

    boolean isUserFollowing(Long followerId, Long followingId);

}

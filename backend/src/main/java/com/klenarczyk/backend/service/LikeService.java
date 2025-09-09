package com.klenarczyk.backend.service;

import com.klenarczyk.backend.model.Like;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;
import java.util.Set;

public interface LikeService {

    Like getLikeByUserAndPost(Long userId, Long postId);
    void likePost(@AuthenticationPrincipal UserDetails currentUser,
                  Long postId);
    void unlikePost(@AuthenticationPrincipal UserDetails currentUser,
                    Long postId);

    Set<Long> getLikedPostIdsByUserId(Long userId, List<Long> postIds);
}

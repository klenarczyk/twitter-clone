package com.klenarczyk.backend.dto.users;

import com.klenarczyk.backend.model.Follow;
import com.klenarczyk.backend.model.FollowId;

public record FollowResponse(Long followerId, Long followedId) {

    public static FollowResponse fromEntity(Follow follow) {
        return new FollowResponse(
                follow.getFollower().getId(),
                follow.getFollowed().getId()
        );
    }
}

package com.klenarczyk.backend.dto.user;

import com.klenarczyk.backend.entity.Follow;
import com.klenarczyk.backend.entity.FollowId;

public record FollowResponse(FollowId id, UserResponse follower, UserResponse followed) {

    public static FollowResponse fromFollow(Follow follow) {
        return new FollowResponse(follow.getId(),
                UserResponse.fromEntity(follow.getFollower()),
                UserResponse.fromEntity(follow.getFollowed()));
    }
}

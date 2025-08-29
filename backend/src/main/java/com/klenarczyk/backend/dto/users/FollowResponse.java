package com.klenarczyk.backend.dto.users;

import com.klenarczyk.backend.model.Follow;
import com.klenarczyk.backend.model.FollowId;

public record FollowResponse(FollowId id, UserResponse follower, UserResponse followed) {

    public static FollowResponse fromFollow(Follow follow) {
        return new FollowResponse(follow.getId(),
                UserResponse.fromEntity(follow.getFollower()),
                UserResponse.fromEntity(follow.getFollowed()));
    }
}

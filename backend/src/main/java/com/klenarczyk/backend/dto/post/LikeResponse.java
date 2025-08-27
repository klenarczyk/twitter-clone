package com.klenarczyk.backend.dto.post;

import com.klenarczyk.backend.dto.user.UserResponse;
import com.klenarczyk.backend.entity.Like;
import com.klenarczyk.backend.entity.LikeId;

import java.util.List;

public record LikeResponse(LikeId id, UserResponse user, PostResponse post) {

    public static LikeResponse fromEntity(Like like) {
        return new LikeResponse(like.getId(),
                UserResponse.fromEntity(like.getUser()),
                PostResponse.fromEntity(like.getPost()));
    }

    public static List<LikeResponse> fromEntities(List<Like> likes) {
        return likes.stream()
                .map(LikeResponse::fromEntity)
                .toList();
    }

}
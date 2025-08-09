package com.klenarczyk.backend.dto.post;

import com.klenarczyk.backend.dto.user.UserResponse;
import com.klenarczyk.backend.entity.Like;
import com.klenarczyk.backend.entity.LikeId;

import java.util.List;

public record LikeResponse(LikeId id, UserResponse user, PostResponse post) {

    public static LikeResponse fromLike(Like like) {
        return new LikeResponse(like.getId(),
                UserResponse.fromUser(like.getUser()),
                PostResponse.fromPost(like.getPost()));
    }

    public static List<LikeResponse> fromLikes(List<Like> likes) {
        return likes.stream()
                .map(LikeResponse::fromLike)
                .toList();
    }

}
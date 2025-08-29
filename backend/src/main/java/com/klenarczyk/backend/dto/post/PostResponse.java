package com.klenarczyk.backend.dto.post;

import com.klenarczyk.backend.dto.users.UserSummary;
import com.klenarczyk.backend.model.Post;

import java.util.List;

public record PostResponse(Long id, UserSummary author, String content) {

    public static PostResponse fromEntity(Post post) {
        return new PostResponse(post.getId(), UserSummary.fromEntity(post.getUser()), post.getContent());
    }

    public static List<PostResponse> fromEntities(List<Post> posts) {
        return posts.stream()
                .map(PostResponse::fromEntity)
                .toList();
    }

}

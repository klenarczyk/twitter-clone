package com.klenarczyk.backend.dto.post;

import com.klenarczyk.backend.dto.user.UserSummary;
import com.klenarczyk.backend.entity.Post;

import java.util.List;

public record PostResponse(Long id, UserSummary author, String content) {

    public static PostResponse fromPost(Post post) {
        return new PostResponse(post.getId(), UserSummary.fromUser(post.getUser()), post.getContent());
    }

    public static List<PostResponse> fromPosts(List<Post> posts) {
        return posts.stream()
                .map(PostResponse::fromPost)
                .toList();
    }

}

package com.klenarczyk.backend.dto.post;

import com.klenarczyk.backend.dto.users.UserSummary;
import com.klenarczyk.backend.model.Post;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

public record PostResponse(Long id, UserSummary author, String content, Long parentPostId, Long likeCount,
                           Long replyCount,
                           boolean isLiked, LocalDateTime createdAt) {

    public static PostResponse fromEntity(Post post) {
        return new PostResponse(post.getId(), UserSummary.fromEntity(
                post.getUser()),
                post.getContent(),
                post.getParentPost() != null ? post.getParentPost().getId() : null,
                post.getLikeCount(),
                post.getReplyCount(),
                false,
                post.getCreatedAt());
    }

    public static PostResponse fromEntity(Post post, boolean isLiked) {
        return new PostResponse(post.getId(), UserSummary.fromEntity(
                post.getUser()),
                post.getContent(),
                post.getParentPost() != null ? post.getParentPost().getId() : null,
                post.getLikeCount(),
                post.getReplyCount(),
                isLiked,
                post.getCreatedAt());
    }

    public static List<PostResponse> fromEntities(List<Post> posts) {
        return posts.stream()
                .map(PostResponse::fromEntity)
                .toList();
    }

    public static List<PostResponse> fromEntities(List<Post> posts, Set<Long> likedIds) {
        return posts.stream()
                .map(post -> fromEntity(post, likedIds.contains(post.getId())))
                .toList();
    }

}

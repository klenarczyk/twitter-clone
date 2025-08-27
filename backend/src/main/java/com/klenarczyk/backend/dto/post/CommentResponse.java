package com.klenarczyk.backend.dto.post;

import com.klenarczyk.backend.dto.user.UserResponse;
import com.klenarczyk.backend.entity.Comment;

import java.util.List;

public record CommentResponse(Long id, UserResponse user, PostResponse post, String content) {

    public static CommentResponse fromEntity(Comment comment) {
        return new CommentResponse(
                comment.getId(),
                UserResponse.fromEntity(comment.getUser()),
                PostResponse.fromEntity(comment.getPost()),
                comment.getContent()
        );
    }

    public static List<CommentResponse> fromEntities(List<Comment> comments) {
        return comments.stream()
                .map(CommentResponse::fromEntity)
                .toList();
    }

}

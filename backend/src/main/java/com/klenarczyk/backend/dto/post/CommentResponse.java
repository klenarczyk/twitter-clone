package com.klenarczyk.backend.dto.post;

import com.klenarczyk.backend.dto.user.UserResponse;
import com.klenarczyk.backend.entity.Comment;

import java.util.List;

public record CommentResponse(Long id, UserResponse user, PostResponse post, String content) {

    public static CommentResponse fromComment(Comment comment) {
        return new CommentResponse(
                comment.getId(),
                UserResponse.fromUser(comment.getUser()),
                PostResponse.fromPost(comment.getPost()),
                comment.getContent()
        );
    }

    public static List<CommentResponse> fromComments(List<Comment> comments) {
        return comments.stream()
                .map(CommentResponse::fromComment)
                .toList();
    }

}

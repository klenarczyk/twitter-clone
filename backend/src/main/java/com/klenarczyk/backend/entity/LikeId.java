package com.klenarczyk.backend.entity;

import jakarta.persistence.Embeddable;

import java.util.Objects;

@Embeddable
public class LikeId {

    private Long userId;
    private Long postId;

    // Constructors
    public LikeId() {}

    public LikeId(Long userId, Long postId) {
        this.userId = userId;
        this.postId = postId;
    }

    // Getters and Setters
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public Long getPostId() { return postId; }
    public void setPostId(Long postId) { this.postId = postId; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof LikeId that)) return false;
        return Objects.equals(userId, that.userId) && Objects.equals(postId, that.postId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, postId);
    }

}
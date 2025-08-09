package com.klenarczyk.backend.dto.post;

import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class CreatePostRequest {

    @NotNull(message = "User ID is required")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private Long userId;

    @NotBlank(message = "Content is required")
    @Size(max = 280, message = "Content must be at most 280 characters long")
    @Column(nullable = false, length = 280)
    private String content;

    // Getters and Setters
    public Long getUserId() { return this.userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getContent() { return this.content; }
    public void setContent(String content) { this.content = content; }

}

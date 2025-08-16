package com.klenarczyk.backend.dto.post;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class CreatePostRequest {

    @NotBlank(message = "Content is required")
    @Size(max = 280, message = "Content must be at most 280 characters long")
    @Column(nullable = false, length = 280)
    private String content;

    public String getContent() { return this.content; }
    public void setContent(String content) { this.content = content; }

}

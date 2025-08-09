package com.klenarczyk.backend.dto.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;

public class UpdateUserRequest {

    @Size(max = 50, message = "Handle must be at most 50 characters long")
    private String handle;

    @Email(message = "Email has an invalid format")
    @Size(max = 100, message = "Email must be at most 100 characters long")
    private String email;

    @Size(max = 100, message = "Full name must be at most 100 characters long")
    private String fullName;

    private String bio;

    // Getters and Setters
    public String getHandle() { return handle; }
    public void setHandle(String handle) { this.handle = handle; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }

}

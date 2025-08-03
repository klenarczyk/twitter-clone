package com.klenarczyk.backend.dto.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class CreateUserRequest {

    @NotBlank(message = "Handle is required")
    @Size(max = 50, message = "Handle must be at most 50 characters long")
    private String handle;

    @Email(message = "Email has an invalid format")
    @NotBlank(message = "Email is required")
    @Size(max = 100, message = "Email must be at most 100 characters long")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(max = 255, message = "Password must be at most 255 characters long")
    private String password;

    @Size(max = 100, message = "Full name must be at most 100 characters long")
    private String fullName;

    private String bio;

    // Getters and Setters
    public String getHandle() { return handle; }
    public void setHandle(String handle) { this.handle = handle; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }

}

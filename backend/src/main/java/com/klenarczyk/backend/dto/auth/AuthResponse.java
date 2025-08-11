package com.klenarczyk.backend.dto.auth;

public record AuthResponse(String message) {

    public static AuthResponse success() {
        return new AuthResponse("Authentication successful");
    }

}

package com.klenarczyk.backend.dto.auth;

public record AuthResponse(String token) {

    public static AuthResponse fromToken(String token) {
        return new AuthResponse(token);
    }

}

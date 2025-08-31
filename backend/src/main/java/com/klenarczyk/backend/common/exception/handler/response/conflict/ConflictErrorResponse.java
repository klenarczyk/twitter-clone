package com.klenarczyk.backend.common.exception.handler.response.conflict;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(name = "ConflictErrorResponse", description = "Conflict error response")
public record ConflictErrorResponse(
        int status,
        String error,
        String message,
        ConflictDetails details
) {}

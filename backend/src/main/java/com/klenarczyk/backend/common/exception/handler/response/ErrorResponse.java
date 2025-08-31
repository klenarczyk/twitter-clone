package com.klenarczyk.backend.common.exception.handler.response;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(name = "ErrorResponse", description = "Standard error response")
public record ErrorResponse(int status, String error, String message) {}
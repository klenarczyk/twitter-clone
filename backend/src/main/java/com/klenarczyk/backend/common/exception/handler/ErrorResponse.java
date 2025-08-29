package com.klenarczyk.backend.common.exception.handler;

import java.time.LocalDateTime;

public record ErrorResponse(String message, int status, LocalDateTime timestamp) {}
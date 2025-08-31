package com.klenarczyk.backend.common.exception.handler;

import com.klenarczyk.backend.common.exception.*;
import com.klenarczyk.backend.common.exception.handler.response.ErrorResponse;
import com.klenarczyk.backend.common.exception.handler.response.conflict.ConflictDetails;
import com.klenarczyk.backend.common.exception.handler.response.conflict.ConflictErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // 400
    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ErrorResponse> handleBadRequest(BadRequestException ex) {
        return buildResponse(HttpStatus.BAD_REQUEST, ex.getMessage());
    }

    // 401
    @ExceptionHandler({
            UnauthorizedException.class,
            AuthenticationException.class,
            AuthenticationCredentialsNotFoundException.class
    })
    public ResponseEntity<ErrorResponse> handleUnauthorized(RuntimeException ex) {
        return buildResponse(HttpStatus.UNAUTHORIZED, ex.getMessage());
    }

    // 403
    @ExceptionHandler(ForbiddenException.class)
    public ResponseEntity<ErrorResponse> handleForbidden(ForbiddenException ex) {
        return buildResponse(HttpStatus.FORBIDDEN, ex.getMessage());
    }

    // 404
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(ResourceNotFoundException ex) {
        return buildResponse(HttpStatus.NOT_FOUND, ex.getMessage());
    }

    // 409
    @ExceptionHandler(ConflictException.class)
    public ResponseEntity<ConflictErrorResponse> handleConflict(ConflictException ex) {
        return buildConflictResponse(new ConflictDetails(ex.getField(), ex.getMessage()));
    }

    // 500
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleInternalServerError(Exception ex) {
        return buildResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error");
    }

    // Helper methods
    private ResponseEntity<ErrorResponse> buildResponse(HttpStatus status, String message) {
        ErrorResponse err = new ErrorResponse(
                status.value(),
                status.getReasonPhrase(),
                message
        );
        return ResponseEntity.status(status).body(err);
    }

    private ResponseEntity<ConflictErrorResponse> buildConflictResponse(ConflictDetails details) {
        ConflictErrorResponse err = new ConflictErrorResponse(
                HttpStatus.CONFLICT.value(),
                HttpStatus.CONFLICT.getReasonPhrase(),
                "Conflict occurred",
                details
        );
        return ResponseEntity.status(HttpStatus.CONFLICT).body(err);
    }

}

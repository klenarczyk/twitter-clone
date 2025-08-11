package com.klenarczyk.backend.exception.handler;

public record FieldErrorResponse(String field, String message) {

    public static FieldErrorResponse hadleTaken() {
        return new FieldErrorResponse("handle", "Handle is already taken");
    }

    public static FieldErrorResponse emailTaken() {
        return new FieldErrorResponse("email", "Email is already taken");
    }

}

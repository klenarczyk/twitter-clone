package com.klenarczyk.backend.common.exception.handler.docs.annotation;

import com.klenarczyk.backend.common.exception.handler.response.conflict.ConflictErrorResponse;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;

import java.lang.annotation.*;

@Target({ ElementType.METHOD })
@Retention(RetentionPolicy.RUNTIME)
@Documented
@ApiResponse(
        responseCode = "409",
        description = "Conflict",
        content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = ConflictErrorResponse.class)
        )
)
public @interface ConflictResponse {}

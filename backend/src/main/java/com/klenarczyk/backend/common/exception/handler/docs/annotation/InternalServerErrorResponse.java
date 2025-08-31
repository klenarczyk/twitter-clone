package com.klenarczyk.backend.common.exception.handler.docs.annotation;

import com.klenarczyk.backend.common.exception.handler.response.ErrorResponse;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;

import java.lang.annotation.*;

@Target({ ElementType.METHOD })
@Retention(RetentionPolicy.RUNTIME)
@Documented
@ApiResponse(
        responseCode = "500",
        description = "Internal Server Error",
        content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = ErrorResponse.class)
        )
)
public @interface InternalServerErrorResponse {
}

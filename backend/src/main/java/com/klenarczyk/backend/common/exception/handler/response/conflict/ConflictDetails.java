package com.klenarczyk.backend.common.exception.handler.response.conflict;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(name = "ConflictDetails", description = "Details for conflict errors")
public record ConflictDetails(String field, String issue) {
}

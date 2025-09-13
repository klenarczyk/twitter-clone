package com.klenarczyk.backend.config;

import com.klenarczyk.backend.common.exception.handler.response.ErrorResponse;
import io.swagger.v3.core.converter.ModelConverters;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.media.Content;
import io.swagger.v3.oas.models.media.MediaType;
import io.swagger.v3.oas.models.media.Schema;
import io.swagger.v3.oas.models.responses.ApiResponse;
import io.swagger.v3.oas.models.servers.Server;
import io.swagger.v3.oas.models.tags.Tag;
import org.springdoc.core.customizers.OpenApiCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Loop API")
                        .version("1.0")
                        .description("Loop API Documentation with Swagger / OpenAPI")
                )
                .servers(List.of(
                        new Server().url("http://localhost:8080").description("Local server")
                ))
                .tags(List.of(
                        new Tag().name("Auth"),
                        new Tag().name("Users"),
                        new Tag().name("Posts")
                ));
    }

    @Bean
    public OpenApiCustomizer globalResponseCustomizer() {
        return openApi -> {
            if (openApi.getComponents() == null) {
                openApi.setComponents(new Components());
            }

            openApi.getComponents().addSchemas(
                    "ErrorResponse",
                    ModelConverters.getInstance().read(ErrorResponse.class).get("ErrorResponse")
            );

            if (openApi.getPaths() != null) {
                openApi.getPaths().values().forEach(pathItem ->
                        pathItem.readOperations().forEach(operation ->
                                operation.getResponses().addApiResponse("500",
                                        new ApiResponse()
                                                .description("Internal server error")
                                                .content(new Content().addMediaType("application/json",
                                                        new MediaType().schema(
                                                                new Schema<>().$ref("#/components/schemas/ErrorResponse")
                                                        )
                                                ))

                                )
                        )
                );
            }
        };
    }

}

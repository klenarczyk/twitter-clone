package com.klenarczyk.backend.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
        tags = {
                @Tag(name = "Auth", description = "Operations related to authentication and user management"),
                @Tag(name = "Users", description = "Operations related to users"),
                @Tag(name = "Posts", description = "Operations related to posts"),
        }
)
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Twitter Clone API")
                        .version("1.0")
                        .description("Twitter Clone API Documentation with Swagger / OpenAPI")
                );
    }

}

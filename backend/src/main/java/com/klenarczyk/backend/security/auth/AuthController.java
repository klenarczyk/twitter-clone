package com.klenarczyk.backend.security.auth;

import com.klenarczyk.backend.security.auth.dto.LoginRequest;
import com.klenarczyk.backend.security.auth.dto.RegisterRequest;
import com.klenarczyk.backend.model.User;
import com.klenarczyk.backend.security.auth.service.AuthServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("${app.api.base}/auth")
@Tag(name = "Auth")
public class AuthController {

    private final AuthServiceImpl authService;

    @Value("${app.api.base}")
    private String apiBase;

    public AuthController(AuthServiceImpl authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    @Operation(summary = "Registers new user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "User created successfully")
    })
    public ResponseEntity<Void> register(@Valid @RequestBody RegisterRequest req) {
        User user = authService.register(req);

        URI location = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path(apiBase + "/users/{id}")
                .buildAndExpand(user.getId())
                .toUri();

        return ResponseEntity.created(location).build();
    }

    @PostMapping("/login")
    @Operation(summary = "Authenticates user and returns JWT cookie")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "User authenticated successfully")
    })
    public ResponseEntity<Void> login(
            @Valid @RequestBody LoginRequest req,
            HttpServletResponse response
    ) {
        authService.login(req, response);
        return ResponseEntity.ok().build();
    }

}

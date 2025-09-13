package com.klenarczyk.backend.security.auth;

import com.klenarczyk.backend.common.exception.handler.docs.annotation.ConflictResponse;
import com.klenarczyk.backend.common.exception.handler.docs.annotation.UnauthorizedResponse;
import com.klenarczyk.backend.dto.users.UserResponse;
import com.klenarczyk.backend.security.auth.dto.LoginRequest;
import com.klenarczyk.backend.security.auth.dto.RegisterRequest;
import com.klenarczyk.backend.model.User;
import com.klenarczyk.backend.security.auth.service.AuthServiceImpl;
import com.klenarczyk.backend.service.impl.UserServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
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
    private final UserServiceImpl userService;

    @Value("${app.api.base}")
    private String apiBase;

    public AuthController(AuthServiceImpl authService, UserServiceImpl userService) {
        this.authService = authService;
        this.userService = userService;
    }

    @PostMapping("/register")
    @Operation(summary = "Registers new user")
    @ApiResponse(responseCode = "201", description = "User created successfully")
    @ConflictResponse
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
    @ApiResponse(responseCode = "200", description = "User authenticated successfully")
    @UnauthorizedResponse
    public ResponseEntity<UserResponse> login(
            @Valid @RequestBody LoginRequest req,
            HttpServletResponse response
    ) {
        authService.login(req, response);
        return ResponseEntity.ok(UserResponse.fromEntity(userService.getUserByEmail(req.getEmail())));
    }

    @PostMapping("/logout")
    @Operation(summary = "Logs out user by clearing JWT cookie")
    @ApiResponse(responseCode = "204", description = "User logged out successfully")
    @UnauthorizedResponse
    public ResponseEntity<Void> logout(HttpServletResponse response) {
        authService.logout(response);
        return ResponseEntity.noContent().build();
    }

}

package com.klenarczyk.backend.security.auth;

import com.klenarczyk.backend.security.util.JwtUtil;
import com.klenarczyk.backend.dto.auth.LoginRequest;
import com.klenarczyk.backend.dto.auth.RegisterRequest;
import com.klenarczyk.backend.dto.users.UserResponse;
import com.klenarczyk.backend.model.User;
import com.klenarczyk.backend.service.impl.UserServiceImpl;
import com.klenarczyk.backend.common.util.Constants;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
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
    @Operation(summary = "Register new user")
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
    @Operation(summary = "Authenticate user and return JWT cookie")
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

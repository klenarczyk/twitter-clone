package com.klenarczyk.backend.controller;

import com.klenarczyk.backend.auth.JwtUtil;
import com.klenarczyk.backend.dto.auth.LoginRequest;
import com.klenarczyk.backend.dto.auth.RegisterRequest;
import com.klenarczyk.backend.dto.user.UserResponse;
import com.klenarczyk.backend.entity.User;
import com.klenarczyk.backend.service.impl.UserServiceImpl;
import com.klenarczyk.backend.util.Constants;
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

    private final UserServiceImpl userService;
    private final AuthenticationManager authManager;
    private final JwtUtil jwtUtil;

    @Value("${app.cookie.secure}")
    private boolean cookieSecure;

    public AuthController(UserServiceImpl userService, AuthenticationManager authManager, JwtUtil jwtUtil) {
        this.userService = userService;
        this.authManager = authManager;
        this.jwtUtil = jwtUtil;
    }

    // Endpoints

    @PostMapping("/register")
    @Operation(summary = "Register new user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "User created successfully")
    })
    public ResponseEntity<Void> register(@Valid @RequestBody RegisterRequest req) {
        User user = userService.createUser(req);

        URI location = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("${app.api.base}/users/{id}")
                .buildAndExpand(user.getId())
                .toUri();

        return ResponseEntity.status(HttpStatus.CREATED).build();
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
        Authentication auth = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.getEmail(), req.getPassword())
        );

        String token = jwtUtil.generateToken((UserDetails) auth.getPrincipal());

        Cookie cookie = new Cookie("jwt", token);
        cookie.setHttpOnly(true);
        cookie.setSecure(cookieSecure);
        cookie.setPath("/");
        cookie.setMaxAge(Constants.COOKIE_MAX_AGE);
        response.addCookie(cookie);

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping("/me")
    @Operation(summary = "Get current authenticated user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Current user fetched successfully")
    })
    public ResponseEntity<UserResponse> getCurrentUser(@AuthenticationPrincipal UserDetails currentUser) {
        User user = userService.getUserByEmail(currentUser.getUsername());
        return ResponseEntity.ok(UserResponse.fromEntity(user));
    }

}

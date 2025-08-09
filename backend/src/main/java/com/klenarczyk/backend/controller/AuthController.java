package com.klenarczyk.backend.controller;

import com.klenarczyk.backend.auth.JwtUtil;
import com.klenarczyk.backend.dto.auth.AuthResponse;
import com.klenarczyk.backend.dto.auth.LoginRequest;
import com.klenarczyk.backend.dto.auth.RegisterRequest;
import com.klenarczyk.backend.entity.User;
import com.klenarczyk.backend.service.impl.UserServiceImpl;
import com.klenarczyk.backend.util.Constants;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(Constants.BASE_API + "/auth")
public class AuthController {

    private final UserServiceImpl userService;
    private final AuthenticationManager authManager;
    private final JwtUtil jwtUtil;

    public AuthController(UserServiceImpl userService, AuthenticationManager authManager, JwtUtil jwtUtil) {
        this.userService = userService;
        this.authManager = authManager;
        this.jwtUtil = jwtUtil;
    }

    // Request mapping methods will go here
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest req) {
        User newUser = userService.createUser(req);
        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest req) {
        Authentication auth = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.getEmail(), req.getPassword())
        );

        String token = jwtUtil.generateToken((UserDetails) auth.getPrincipal());

        return ResponseEntity.ok(AuthResponse.fromToken(token));
    }

}

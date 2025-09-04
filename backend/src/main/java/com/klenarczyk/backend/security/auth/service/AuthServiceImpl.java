package com.klenarczyk.backend.security.auth.service;

import com.klenarczyk.backend.common.util.Constants;
import com.klenarczyk.backend.security.auth.dto.LoginRequest;
import com.klenarczyk.backend.security.auth.dto.RegisterRequest;
import com.klenarczyk.backend.model.User;
import com.klenarczyk.backend.security.util.JwtUtil;
import com.klenarczyk.backend.service.impl.UserServiceImpl;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserServiceImpl userService;
    private final AuthenticationManager authManager;
    private final JwtUtil jwtUtil;

    @Value("${app.cookie.secure}")
    private boolean cookieSecure;

    public AuthServiceImpl(UserServiceImpl userService, AuthenticationManager authManager, JwtUtil jwtUtil) {
        this.userService = userService;
        this.authManager = authManager;
        this.jwtUtil = jwtUtil;
    }

    // Methods

    @Override
    public User register(RegisterRequest req) {
        return userService.createUser(req);
    }

    @Override
    public void login(LoginRequest req, HttpServletResponse response) {
        Authentication auth = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.getEmail(), req.getPassword())
        );

        String token = jwtUtil.generateToken((UserDetails) auth.getPrincipal());

        Cookie cookie = new Cookie("token", token);
        cookie.setHttpOnly(true);
        cookie.setSecure(cookieSecure);
        cookie.setPath("/");
        cookie.setMaxAge(Constants.COOKIE_MAX_AGE);
        response.addCookie(cookie);
    }

}

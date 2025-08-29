package com.klenarczyk.backend.security.auth.service;

import com.klenarczyk.backend.security.auth.dto.LoginRequest;
import com.klenarczyk.backend.security.auth.dto.RegisterRequest;
import com.klenarczyk.backend.model.User;
import jakarta.servlet.http.HttpServletResponse;

public interface AuthService {

    User register(RegisterRequest req);

    void login(LoginRequest req, HttpServletResponse response);

}

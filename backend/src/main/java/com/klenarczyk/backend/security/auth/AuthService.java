package com.klenarczyk.backend.security.auth;

import com.klenarczyk.backend.dto.auth.LoginRequest;
import com.klenarczyk.backend.dto.auth.RegisterRequest;
import com.klenarczyk.backend.model.User;
import jakarta.servlet.http.HttpServletResponse;

public interface AuthService {

    User register(RegisterRequest req);

    void login(LoginRequest req, HttpServletResponse response);

}

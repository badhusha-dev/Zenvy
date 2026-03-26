package com.zenvy.auth.controller;

import com.zenvy.auth.dto.AuthResponse;
import com.zenvy.auth.dto.LoginRequest;
import com.zenvy.auth.entity.User;
import com.zenvy.auth.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthController {

    private final AuthService service;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signup(@Valid @RequestBody User user) {
        try {
            return ResponseEntity.ok(service.signup(user));
        } catch (Exception e) {
            log.error("Signup failed", e);
            throw e;
        }
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        try {
            return ResponseEntity.ok(service.login(request));
        } catch (Exception e) {
            log.error("Login failed", e);
            throw e;
        }
    }

    @GetMapping("/me")
    public ResponseEntity<User> getMe(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(service.getMe(user.getEmail()));
    }
}

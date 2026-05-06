package com.finance.taskmanager.controller;

import com.finance.taskmanager.security.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    // Usuario hardcodeado para el proyecto demo
    private final String DEMO_USER = "admin";
    private final String DEMO_PASSWORD_HASH;

    public AuthController(JwtUtil jwtUtil, PasswordEncoder passwordEncoder) {
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
        this.DEMO_PASSWORD_HASH = passwordEncoder.encode("admin123");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        String password = body.get("password");

        if (username == null || password == null) {
            return ResponseEntity.badRequest().body("Usuario y contraseña requeridos");
        }

        if (!username.equals(DEMO_USER) || !passwordEncoder.matches(password, DEMO_PASSWORD_HASH)) {
            return ResponseEntity.status(401).body("Credenciales incorrectas");
        }

        String token = jwtUtil.generateToken(username);
        return ResponseEntity.ok(Map.of("token", token, "username", username));
    }
}
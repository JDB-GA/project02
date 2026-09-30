package com.almotawaj.wallet.config.constants;

import java.util.List;

public final class SecurityConstants {
    public static final String BEARER_PREFIX = "Bearer ";
    public static final String ROLE_PREFIX = "ROLE_";
    public static final String JWT_SECRET_PROPERTY = "${jwt-secret}";
    public static final String JWT_EXPIRATION_PROPERTY = "${jwt-expiration-ms}";

    public static final String AUTH_COOKIE_NAME = "access_token";
    public static final String AUTH_COOKIE_PATH = "/";
    public static final String AUTH_COOKIE_SAME_SITE = "Strict";
    public static final String AUTH_COOKIE_SECURE_PROPERTY = "${auth-cookie-secure:true}";

    public static final String CORS_ALLOWED_ORIGINS_PROPERTY = "${cors-allowed-origins}";
    public static final List<String> CORS_ALLOWED_METHODS = List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS");
    public static final List<String> CORS_ALLOWED_HEADERS = List.of("Content-Type", "Accept", "Authorization");
    public static final long CORS_MAX_AGE_SECONDS = 3600;

    private SecurityConstants() {
    }
}

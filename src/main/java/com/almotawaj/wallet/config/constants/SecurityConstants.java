package com.almotawaj.wallet.config.constants;

public final class SecurityConstants {
    public static final String BEARER_PREFIX = "Bearer ";
    public static final String JWT_SECRET_PROPERTY = "${jwt-secret}";
    public static final String JWT_EXPIRATION_PROPERTY = "${jwt-expiration-ms}";

    private SecurityConstants() {
    }
}

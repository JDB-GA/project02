package com.almotawaj.wallet.config.constants;

import java.time.Duration;

public final class GatewayConstants {
    public static final String API_KEY_PREFIX = "almt_";
    public static final int API_KEY_RANDOM_BYTES = 32;
    public static final String API_KEY_HASH_ALGORITHM = "SHA-256";
    public static final int MAX_ACTIVE_API_KEYS = 5;
    public static final Duration SESSION_LIFETIME = Duration.ofMinutes(30);
    public static final long EXPIRY_SWEEP_INTERVAL_MS = 60_000L;
    public static final String CHECKOUT_PAGE_PATH = "/checkout/";

    private GatewayConstants() {
    }
}

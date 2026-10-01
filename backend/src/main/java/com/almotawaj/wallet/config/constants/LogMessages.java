package com.almotawaj.wallet.config.constants;

public final class LogMessages {
    public static final String INVALID_JWT = "Invalid JWT: {}";
    public static final String TOKEN_USER_NOT_FOUND = "Token belongs to a user that no longer exists: {}";
    public static final String EMAIL_SEND_FAILED = "Failed to send verification email to user {}";

    private LogMessages() {
    }
}

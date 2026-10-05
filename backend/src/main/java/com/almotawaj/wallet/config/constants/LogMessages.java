package com.almotawaj.wallet.config.constants;

public final class LogMessages {
    public static final String INVALID_JWT = "Invalid JWT: {}";
    public static final String TOKEN_USER_NOT_FOUND = "Token belongs to a user that no longer exists: {}";
    public static final String EMAIL_SEND_FAILED = "Failed to send email to user {}";
    public static final String KYC_SUBMITTED = "User {} submitted KYC application {}";
    public static final String KYC_REVIEWED = "Admin {} marked KYC application {} as {}";
    public static final String PERMISSION_GRANTED = "Super admin {} granted {} to user {}";
    public static final String PERMISSION_REVOKED = "Super admin {} revoked {} from user {}";
    public static final String FILE_DELETE_FAILED = "Failed to delete stored file {}";

    private LogMessages() {
    }
}

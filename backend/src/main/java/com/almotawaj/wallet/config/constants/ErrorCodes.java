package com.almotawaj.wallet.config.constants;

public final class ErrorCodes {
    public static final String PROPERTY = "code";
    public static final String VALIDATION_FAILED = "VALIDATION_FAILED";
    public static final String INVALID_CREDENTIALS = "INVALID_CREDENTIALS";
    public static final String EMAIL_ALREADY_REGISTERED = "EMAIL_ALREADY_REGISTERED";
    public static final String MOBILE_ALREADY_REGISTERED = "MOBILE_ALREADY_REGISTERED";
    public static final String DATA_CONFLICT = "DATA_CONFLICT";
    public static final String NOT_FOUND = "NOT_FOUND";
    public static final String TOO_MANY_REQUESTS = "TOO_MANY_REQUESTS";
    public static final String EMAIL_ALREADY_VERIFIED = "EMAIL_ALREADY_VERIFIED";
    public static final String OTP_NOT_FOUND = "OTP_NOT_FOUND";
    public static final String OTP_INVALID = "OTP_INVALID";
    public static final String OTP_EXPIRED = "OTP_EXPIRED";
    public static final String OTP_ATTEMPTS_EXCEEDED = "OTP_ATTEMPTS_EXCEEDED";
    public static final String OTP_RESEND_COOLDOWN = "OTP_RESEND_COOLDOWN";

    private ErrorCodes() {
    }
}

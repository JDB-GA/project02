package com.almotawaj.wallet.config.constants;

public final class ErrorMessages {
    public static final String EMAIL_REQUIRED = "Email is required";
    public static final String EMAIL_INVALID = "Email must be a valid email address";
    public static final String EMAIL_TOO_LONG = "Email must be at most {max} characters";
    public static final String MOBILE_REQUIRED = "Mobile number is required";
    public static final String MOBILE_INVALID = "Mobile number must be 8 digits without the country code, e.g. 33123456";
    public static final String IDENTIFIER_REQUIRED = "Email or mobile number is required";
    public static final String PASSWORD_REQUIRED = "Password is required";
    public static final String PASSWORD_LENGTH = "Password must be between {min} and {max} characters";
    public static final String OTP_REQUIRED = "Verification code is required";
    public static final String OTP_FORMAT_INVALID = "Verification code must be 6 digits";

    public static final String VALIDATION_FAILED = "Validation failed";
    public static final String VALIDATION_ERRORS_KEY = "errors";
    public static final String INVALID_CREDENTIALS = "Invalid credentials";
    public static final String EMAIL_ALREADY_REGISTERED = "Email address is already registered";
    public static final String MOBILE_ALREADY_REGISTERED = "Mobile number is already registered";
    public static final String DATA_CONFLICT = "Request conflicts with existing data";
    public static final String TOO_MANY_REQUESTS = "Too many requests, please try again later";
    public static final String EMAIL_ALREADY_VERIFIED = "Email address is already verified";
    public static final String OTP_NOT_FOUND = "No active verification code, request a new one";
    public static final String OTP_INVALID = "Verification code is incorrect";
    public static final String OTP_EXPIRED = "Verification code has expired, request a new one";
    public static final String OTP_ATTEMPTS_EXCEEDED = "Too many incorrect attempts, request a new code";
    public static final String OTP_RESEND_COOLDOWN = "Please wait before requesting a new code";

    public static final String USER_NOT_FOUND = "User not found";
    public static final String UNEXPECTED_PRINCIPAL = "Unexpected principal type after authentication";

    private ErrorMessages() {
    }
}

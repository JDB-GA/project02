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

    public static final String VALIDATION_FAILED = "Validation failed";
    public static final String VALIDATION_ERRORS_KEY = "errors";
    public static final String INVALID_CREDENTIALS = "Invalid credentials";
    public static final String EMAIL_ALREADY_REGISTERED = "Email address is already registered";
    public static final String MOBILE_ALREADY_REGISTERED = "Mobile number is already registered";
    public static final String DATA_CONFLICT = "Request conflicts with existing data";
    public static final String TOO_MANY_REQUESTS = "Too many requests, please try again later";

    public static final String USER_NOT_FOUND = "User not found";
    public static final String UNEXPECTED_PRINCIPAL = "Unexpected principal type after authentication";

    private ErrorMessages() {
    }
}

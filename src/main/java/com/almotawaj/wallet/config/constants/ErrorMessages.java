package com.almotawaj.wallet.config.constants;

public final class ErrorMessages {
    public static final String USERNAME_REQUIRED = "Username is required";
    public static final String USERNAME_TOO_LONG = "Username must be at most {max} characters";
    public static final String EMAIL_REQUIRED = "Email is required";
    public static final String EMAIL_INVALID = "Email must be a valid email address";
    public static final String EMAIL_TOO_LONG = "Email must be at most {max} characters";
    public static final String PASSWORD_REQUIRED = "Password is required";
    public static final String PASSWORD_LENGTH = "Password must be between {min} and {max} characters";

    public static final String VALIDATION_FAILED = "Validation failed";
    public static final String VALIDATION_ERRORS_KEY = "errors";
    public static final String INVALID_CREDENTIALS = "Invalid email or password";
    public static final String EMAIL_ALREADY_REGISTERED = "Email address is already registered";
    public static final String USERNAME_ALREADY_TAKEN = "Username is already taken";
    public static final String DATA_CONFLICT = "Request conflicts with existing data";

    public static final String USER_NOT_FOUND = "User not found";
    public static final String UNEXPECTED_PRINCIPAL = "Unexpected principal type after authentication";

    private ErrorMessages() {
    }
}

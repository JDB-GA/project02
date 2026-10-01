package com.almotawaj.wallet.config.constants;

public final class ApiPaths {
    public static final String AUTH_USERS = "/auth/users";
    public static final String REGISTER = "/register";
    public static final String LOGIN = "/login";
    public static final String LOGOUT = "/logout";
    public static final String ME = "/me";
    public static final String VERIFY_EMAIL = "/verify-email";
    public static final String RESEND_VERIFICATION = "/verify-email/resend";
    public static final String AUTH_REGISTER = AUTH_USERS + REGISTER;
    public static final String AUTH_LOGIN = AUTH_USERS + LOGIN;
    public static final String AUTH_LOGOUT = AUTH_USERS + LOGOUT;
    public static final String AUTH_ME = AUTH_USERS + ME;
    public static final String AUTH_VERIFY_EMAIL = AUTH_USERS + VERIFY_EMAIL;
    public static final String AUTH_RESEND_VERIFICATION = AUTH_USERS + RESEND_VERIFICATION;
    public static final String ERROR = "/error";
    public static final String ALL = "/**";

    private ApiPaths() {
    }
}

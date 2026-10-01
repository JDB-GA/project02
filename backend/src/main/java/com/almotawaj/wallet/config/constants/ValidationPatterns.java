package com.almotawaj.wallet.config.constants;

public final class ValidationPatterns {
    public static final String MOBILE_NUMBER = "^\\d{8}$";
    public static final String MOBILE_COUNTRY_CODE = "+973";
    public static final String EMAIL_MARKER = "@";
    public static final String OTP_CODE = "^\\d{6}$";

    private ValidationPatterns() {
    }
}

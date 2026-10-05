package com.almotawaj.wallet.config.constants;

public final class ValidationLimits {
    public static final int EMAIL_MAX = 254;
    public static final int MOBILE_MAX = 12;
    public static final int PASSWORD_MIN = 8;
    public static final int PASSWORD_MAX = 72;
    public static final int FULL_NAME_MAX = 150;
    public static final int CPR_LENGTH = 9;
    public static final int NATIONALITY_LENGTH = 2;
    public static final int ADDRESS_PART_MAX = 10;
    public static final int AREA_MAX = 100;
    public static final int REJECTION_REASON_MAX = 500;
    public static final int STORAGE_KEY_MAX = 255;
    public static final int CONTENT_TYPE_MAX = 50;
    public static final int AUDIT_ACTION_MAX = 40;
    public static final int AUDIT_DETAILS_MAX = 500;

    private ValidationLimits() {
    }
}

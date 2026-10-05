package com.almotawaj.wallet.config.constants;

public final class MailConstants {
    public static final String API_KEY_PROPERTY = "${resend-api-key}";
    public static final String FROM_PROPERTY = "${mail-from}";
    public static final String VERIFICATION_SUBJECT_KEY = "email.verification.subject";
    public static final String VERIFICATION_BODY_KEY = "email.verification.body";
    public static final String VERIFICATION_TEMPLATE = "email/verification-code";
    public static final String LOGO_URL_PROPERTY = "${mail-logo-url}";
    public static final String CODE_VARIABLE = "code";
    public static final String EXPIRY_MINUTES_VARIABLE = "expiryMinutes";
    public static final String DIRECTION_VARIABLE = "direction";
    public static final String LOGO_URL_VARIABLE = "logoUrl";
    public static final String DIRECTION_LTR = "ltr";
    public static final String DIRECTION_RTL = "rtl";
    public static final String KYC_DECISION_TEMPLATE = "email/kyc-decision";
    public static final String KYC_SUBJECT_KEY = "email.kyc.subject";
    public static final String KYC_KEY_PREFIX = "email.kyc.";
    public static final String KYC_HEADING_SUFFIX = ".heading";
    public static final String KYC_BODY_SUFFIX = ".body";
    public static final String KYC_REASON_LABEL_KEY = "email.kyc.reason-label";
    public static final String SUBJECT_VARIABLE = "subject";
    public static final String SECTIONS_VARIABLE = "sections";
    public static final String REASON_VARIABLE = "reason";
    public static final String PARAGRAPH_SEPARATOR = "\n\n";
    public static final String TEXT_SECTION_SEPARATOR = "\n\n----------\n\n";

    private MailConstants() {
    }
}

package com.almotawaj.wallet.model.request;

import com.almotawaj.wallet.config.constants.ErrorMessages;
import com.almotawaj.wallet.config.constants.ValidationLimits;
import com.almotawaj.wallet.config.constants.ValidationPatterns;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record ResetPasswordRequest(
        @NotBlank(message = ErrorMessages.EMAIL_REQUIRED)
        @Email(message = ErrorMessages.EMAIL_INVALID)
        @Size(max = ValidationLimits.EMAIL_MAX, message = ErrorMessages.EMAIL_TOO_LONG)
        String email,

        @NotBlank(message = ErrorMessages.OTP_REQUIRED)
        @Pattern(regexp = ValidationPatterns.OTP_CODE, message = ErrorMessages.OTP_FORMAT_INVALID)
        String code,

        @NotBlank(message = ErrorMessages.PASSWORD_REQUIRED)
        @Size(min = ValidationLimits.PASSWORD_MIN, max = ValidationLimits.PASSWORD_MAX, message = ErrorMessages.PASSWORD_LENGTH)
        String newPassword
) {
}

package com.almotawaj.wallet.model.request;

import com.almotawaj.wallet.config.constants.ErrorMessages;
import com.almotawaj.wallet.config.constants.ValidationPatterns;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record VerifyEmailRequest(
        @NotBlank(message = ErrorMessages.OTP_REQUIRED)
        @Pattern(regexp = ValidationPatterns.OTP_CODE, message = ErrorMessages.OTP_FORMAT_INVALID)
        String code
) {
}

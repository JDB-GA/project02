package com.almotawaj.wallet.model.request;

import com.almotawaj.wallet.config.constants.ErrorMessages;
import com.almotawaj.wallet.config.constants.ValidationLimits;
import com.almotawaj.wallet.config.constants.ValidationPatterns;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record UpdateUserContactRequest(
        @Email(message = ErrorMessages.EMAIL_INVALID)
        @Size(max = ValidationLimits.EMAIL_MAX, message = ErrorMessages.EMAIL_TOO_LONG)
        String email,

        @Pattern(regexp = ValidationPatterns.MOBILE_NUMBER, message = ErrorMessages.MOBILE_INVALID)
        String mobileNumber
) {
}

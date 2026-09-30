package com.almotawaj.wallet.model.request;

import com.almotawaj.wallet.config.constants.ErrorMessages;
import com.almotawaj.wallet.config.constants.ValidationLimits;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterRequest(

        @NotBlank(message = ErrorMessages.USERNAME_REQUIRED)
        @Size(max = ValidationLimits.USERNAME_MAX, message = ErrorMessages.USERNAME_TOO_LONG)
        String username,

        @NotBlank(message = ErrorMessages.EMAIL_REQUIRED)
        @Email(message = ErrorMessages.EMAIL_INVALID)
        @Size(max = ValidationLimits.EMAIL_MAX, message = ErrorMessages.EMAIL_TOO_LONG)
        String email,

        @NotBlank(message = ErrorMessages.PASSWORD_REQUIRED)
        @Size(min = ValidationLimits.PASSWORD_MIN, max = ValidationLimits.PASSWORD_MAX, message = ErrorMessages.PASSWORD_LENGTH)
        String password
) {
}

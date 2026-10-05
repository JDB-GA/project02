package com.almotawaj.wallet.model.request;

import com.almotawaj.wallet.config.constants.ErrorMessages;
import com.almotawaj.wallet.config.constants.ValidationLimits;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ChangePasswordRequest(
        @NotBlank(message = ErrorMessages.CURRENT_PASSWORD_REQUIRED)
        String currentPassword,

        @NotBlank(message = ErrorMessages.PASSWORD_REQUIRED)
        @Size(min = ValidationLimits.PASSWORD_MIN, max = ValidationLimits.PASSWORD_MAX, message = ErrorMessages.PASSWORD_LENGTH)
        String newPassword
) {
}

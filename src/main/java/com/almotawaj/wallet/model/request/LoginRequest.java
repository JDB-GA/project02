package com.almotawaj.wallet.model.request;

import com.almotawaj.wallet.config.constants.ErrorMessages;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record LoginRequest(

        @NotBlank(message = ErrorMessages.EMAIL_REQUIRED)
        @Email(message = ErrorMessages.EMAIL_INVALID)
        String email,

        @NotBlank(message = ErrorMessages.PASSWORD_REQUIRED)
        String password
) {
}

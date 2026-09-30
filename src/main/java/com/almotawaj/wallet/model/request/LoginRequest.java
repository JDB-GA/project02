package com.almotawaj.wallet.model.request;

import com.almotawaj.wallet.config.constants.ErrorMessages;
import jakarta.validation.constraints.NotBlank;

public record LoginRequest(
        @NotBlank(message = ErrorMessages.IDENTIFIER_REQUIRED)
        String identifier,

        @NotBlank(message = ErrorMessages.PASSWORD_REQUIRED)
        String password
) {
}

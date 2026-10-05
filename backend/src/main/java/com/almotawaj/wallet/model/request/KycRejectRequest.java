package com.almotawaj.wallet.model.request;

import com.almotawaj.wallet.config.constants.ErrorMessages;
import com.almotawaj.wallet.config.constants.ValidationLimits;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record KycRejectRequest(
        @NotBlank(message = ErrorMessages.REJECTION_REASON_REQUIRED)
        @Size(max = ValidationLimits.REJECTION_REASON_MAX, message = ErrorMessages.REJECTION_REASON_TOO_LONG)
        String reason
) {
}

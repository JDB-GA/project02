package com.almotawaj.wallet.model.request;

import com.almotawaj.wallet.config.constants.ErrorMessages;
import com.almotawaj.wallet.config.constants.ValidationLimits;
import com.almotawaj.wallet.config.constants.docs.DocExamples;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CreateApiKeyRequest(
        @Schema(example = DocExamples.API_KEY_NAME)
        @NotBlank(message = ErrorMessages.API_KEY_NAME_REQUIRED)
        @Size(max = ValidationLimits.API_KEY_NAME_MAX, message = ErrorMessages.API_KEY_NAME_TOO_LONG)
        String name
) {
}

package com.almotawaj.wallet.model.request;

import com.almotawaj.wallet.config.constants.ErrorMessages;
import com.almotawaj.wallet.config.constants.ValidationLimits;
import com.almotawaj.wallet.config.constants.ValidationPatterns;
import com.almotawaj.wallet.config.constants.docs.DocExamples;
import com.almotawaj.wallet.validation.ValidIban;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;

public record TopUpRequest(
        @Schema(example = DocExamples.SENDER_NAME)
        @NotBlank(message = ErrorMessages.SENDER_NAME_REQUIRED)
        @Size(max = ValidationLimits.COUNTERPARTY_NAME_MAX, message = ErrorMessages.SENDER_NAME_TOO_LONG)
        @Pattern(regexp = ValidationPatterns.COUNTERPARTY_NAME, message = ErrorMessages.SENDER_NAME_INVALID)
        String senderName,

        @Schema(example = DocExamples.SENDER_IBAN)
        @NotBlank(message = ErrorMessages.IBAN_REQUIRED)
        @ValidIban(message = ErrorMessages.IBAN_INVALID)
        String senderIban,

        @Schema(example = DocExamples.SENDER_BIC)
        @NotBlank(message = ErrorMessages.BIC_REQUIRED)
        @Pattern(regexp = ValidationPatterns.BIC, message = ErrorMessages.BIC_INVALID)
        String senderBic,

        @Schema(example = DocExamples.AMOUNT)
        @NotNull(message = ErrorMessages.AMOUNT_REQUIRED)
        @DecimalMin(value = ValidationLimits.TOP_UP_MIN, message = ErrorMessages.AMOUNT_TOO_SMALL)
        @DecimalMax(value = ValidationLimits.TOP_UP_MAX, message = ErrorMessages.AMOUNT_TOO_LARGE)
        @Digits(integer = ValidationLimits.MONEY_INTEGER_DIGITS, fraction = ValidationLimits.MONEY_SCALE,
                message = ErrorMessages.AMOUNT_PRECISION)
        BigDecimal amount,

        @Schema(example = DocExamples.PAYMENT_REFERENCE)
        @Size(max = ValidationLimits.PAYMENT_REFERENCE_MAX, message = ErrorMessages.PAYMENT_REFERENCE_TOO_LONG)
        String paymentReference
) {
}

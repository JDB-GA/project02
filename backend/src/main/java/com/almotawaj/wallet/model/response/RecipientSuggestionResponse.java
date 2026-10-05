package com.almotawaj.wallet.model.response;

import com.almotawaj.wallet.model.UserRole;

public record RecipientSuggestionResponse(String iban, String maskedName, String maskedEmail, String maskedMobile, UserRole role) {
}

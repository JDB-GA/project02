package com.almotawaj.wallet.model.response;

import com.almotawaj.wallet.model.UserRole;

public record RecipientResponse(String maskedName, String maskedEmail, UserRole role) {
}

package com.almotawaj.wallet.model.response;

import com.almotawaj.wallet.model.Wallet;

import java.math.BigDecimal;
import java.time.Instant;

public record WalletResponse(String iban, BigDecimal balance, String currency, Instant createdAt) {
    public static WalletResponse from(Wallet wallet) {
        return new WalletResponse(wallet.getIban(), wallet.getBalance(), wallet.getCurrency(), wallet.getCreatedAt());
    }
}

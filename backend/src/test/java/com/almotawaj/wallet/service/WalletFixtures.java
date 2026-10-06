package com.almotawaj.wallet.service;

import com.almotawaj.wallet.model.User;
import com.almotawaj.wallet.model.UserRole;
import com.almotawaj.wallet.model.Wallet;

import java.math.BigDecimal;
import java.util.UUID;

final class WalletFixtures {
    private WalletFixtures() {
    }

    static Wallet wallet(UserRole role, String balance) {
        User user = new User();
        user.setId(UUID.randomUUID());
        user.setRole(role);
        Wallet wallet = new Wallet();
        wallet.setId(UUID.randomUUID());
        wallet.setUser(user);
        wallet.setBalance(new BigDecimal(balance));
        return wallet;
    }
}

package com.almotawaj.wallet.model;

import java.util.Set;

public enum Permission {
    KYC_REVIEW(UserRole.ADMIN);

    private final Set<UserRole> grantableTo;

    Permission(UserRole... grantableTo) {
        this.grantableTo = Set.of(grantableTo);
    }

    public boolean isGrantableTo(UserRole role) {
        return grantableTo.contains(role);
    }
}

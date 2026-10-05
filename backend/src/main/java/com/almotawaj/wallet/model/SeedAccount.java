package com.almotawaj.wallet.model;

import java.util.Set;

public record SeedAccount(
        String email,
        String localMobile,
        UserRole role,
        Set<Permission> permissions,
        KycApplicationStatus kycStatus,
        String fullName,
        String cprNumber
) {
}

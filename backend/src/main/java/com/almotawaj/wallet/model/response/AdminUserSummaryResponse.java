package com.almotawaj.wallet.model.response;

import com.almotawaj.wallet.model.KycStatus;
import com.almotawaj.wallet.model.User;
import com.almotawaj.wallet.model.UserRole;
import com.almotawaj.wallet.model.UserStatus;

import java.time.Instant;
import java.util.UUID;

public record AdminUserSummaryResponse(
        UUID id,
        String email,
        String mobileNumber,
        UserRole role,
        UserStatus status,
        KycStatus kycStatus,
        Instant createdAt
) {
    public static AdminUserSummaryResponse from(User user) {
        return new AdminUserSummaryResponse(user.getId(), user.getEmailAddress(), user.getMobileNumber(),
                user.getRole(), user.getStatus(), user.getKycStatus(), user.getCreatedAt());
    }
}

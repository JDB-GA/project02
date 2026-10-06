package com.almotawaj.wallet.model.response;

import com.almotawaj.wallet.model.KycStatus;
import com.almotawaj.wallet.model.User;
import com.almotawaj.wallet.model.UserRole;

import java.time.Instant;

public record ProfileResponse(
        String name,
        String email,
        String mobileNumber,
        UserRole role,
        KycStatus kycStatus,
        boolean hasPicture,
        Instant createdAt
) {
    public static ProfileResponse from(User user, String name) {
        return new ProfileResponse(name, user.getEmailAddress(), user.getMobileNumber(), user.getRole(), user.getKycStatus(),
                user.getPictureKey() != null, user.getCreatedAt());
    }
}

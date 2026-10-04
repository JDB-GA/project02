package com.almotawaj.wallet.model.response;

import com.almotawaj.wallet.model.KycStatus;
import com.almotawaj.wallet.model.User;
import com.almotawaj.wallet.model.UserRole;
import com.almotawaj.wallet.model.UserStatus;

import java.util.UUID;

public record UserResponse(
        UUID id,
        String email,
        String mobileNumber,
        UserRole role,
        UserStatus status,
        KycStatus kycStatus,
        boolean emailVerified,
        boolean mobileVerified
) {
    public static UserResponse from(User user) {
        return new UserResponse(
                user.getId(),
                user.getEmailAddress(),
                user.getMobileNumber(),
                user.getRole(),
                user.getStatus(),
                user.getKycStatus(),
                user.isEmailVerified(),
                user.isMobileVerified()
        );
    }
}

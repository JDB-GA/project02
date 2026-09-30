package com.almotawaj.wallet.model.response;

import com.almotawaj.wallet.model.User;
import com.almotawaj.wallet.model.UserStatus;

import java.util.UUID;

public record UserResponse(UUID id, String username, String email, UserStatus status) {
    public static UserResponse from(User user) {
        return new UserResponse(user.getId(), user.getUsername(), user.getEmailAddress(), user.getStatus());
    }
}

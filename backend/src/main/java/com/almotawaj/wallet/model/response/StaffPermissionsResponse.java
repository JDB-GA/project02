package com.almotawaj.wallet.model.response;

import com.almotawaj.wallet.model.Permission;
import com.almotawaj.wallet.model.User;
import com.almotawaj.wallet.model.UserRole;

import java.util.Set;
import java.util.UUID;

public record StaffPermissionsResponse(
        UUID id,
        String email,
        UserRole role,
        Set<Permission> permissions
) {
    public static StaffPermissionsResponse from(User user) {
        return new StaffPermissionsResponse(user.getId(), user.getEmailAddress(), user.getRole(), Set.copyOf(user.getPermissions()));
    }
}

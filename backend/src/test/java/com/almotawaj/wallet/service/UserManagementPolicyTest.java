package com.almotawaj.wallet.service;

import com.almotawaj.wallet.config.constants.ErrorCodes;
import com.almotawaj.wallet.exception.BusinessRuleException;
import com.almotawaj.wallet.model.User;
import com.almotawaj.wallet.model.UserRole;
import com.almotawaj.wallet.model.UserStatus;
import org.junit.jupiter.api.Test;
import org.springframework.security.access.AccessDeniedException;

import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class UserManagementPolicyTest {
    private final UserManagementPolicy policy = new UserManagementPolicy();

    private static User user(UserRole role) {
        User user = new User();
        user.setId(UUID.randomUUID());
        user.setRole(role);
        return user;
    }

    @Test
    void adminCanManageClientsAndMerchants() {
        User admin = user(UserRole.ADMIN);

        assertThatCode(() -> policy.ensureCanManage(admin, user(UserRole.CLIENT))).doesNotThrowAnyException();
        assertThatCode(() -> policy.ensureCanManage(admin, user(UserRole.MERCHANT))).doesNotThrowAnyException();
    }

    @Test
    void onlySuperAdminCanManageAdmins() {
        User target = user(UserRole.ADMIN);

        assertThatThrownBy(() -> policy.ensureCanManage(user(UserRole.ADMIN), target)).isInstanceOf(AccessDeniedException.class);
        assertThatCode(() -> policy.ensureCanManage(user(UserRole.SUPER_ADMIN), target)).doesNotThrowAnyException();
    }

    @Test
    void nobodyCanManageSuperAdmin() {
        assertThatThrownBy(() -> policy.ensureCanManage(user(UserRole.SUPER_ADMIN), user(UserRole.SUPER_ADMIN)))
                .isInstanceOf(AccessDeniedException.class);
    }

    @Test
    void cannotManageSelf() {
        User admin = user(UserRole.SUPER_ADMIN);

        assertThatThrownBy(() -> policy.ensureCanManage(admin, admin))
                .hasFieldOrPropertyWithValue("code", ErrorCodes.CANNOT_MANAGE_SELF);
    }

    @Test
    void closedAccountsAreReadOnly() {
        User target = user(UserRole.CLIENT);
        target.setStatus(UserStatus.CLOSED);

        assertThatThrownBy(() -> policy.ensureCanManage(user(UserRole.ADMIN), target))
                .isInstanceOf(BusinessRuleException.class)
                .hasFieldOrPropertyWithValue("code", ErrorCodes.USER_CLOSED);
    }
}

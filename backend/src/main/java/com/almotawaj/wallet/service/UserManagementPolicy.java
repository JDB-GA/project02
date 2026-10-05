package com.almotawaj.wallet.service;

import com.almotawaj.wallet.config.constants.ErrorCodes;
import com.almotawaj.wallet.config.constants.ErrorMessages;
import com.almotawaj.wallet.exception.BusinessRuleException;
import com.almotawaj.wallet.model.User;
import com.almotawaj.wallet.model.UserRole;
import com.almotawaj.wallet.model.UserStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Component;

@Component
public class UserManagementPolicy {
    public void ensureCanManage(User actor, User target) {
        if (actor.getId().equals(target.getId())) {
            throw new BusinessRuleException(ErrorMessages.CANNOT_MANAGE_SELF, ErrorCodes.CANNOT_MANAGE_SELF);
        }
        boolean isSuperAdminTarget = target.getRole() == UserRole.SUPER_ADMIN;
        boolean isAdminTargetOfNonSuperAdmin = target.getRole() == UserRole.ADMIN && actor.getRole() != UserRole.SUPER_ADMIN;
        if (isSuperAdminTarget || isAdminTargetOfNonSuperAdmin) {
            throw new AccessDeniedException(ErrorMessages.ACCESS_DENIED);
        }
        if (target.getStatus() == UserStatus.CLOSED) {
            throw new BusinessRuleException(ErrorMessages.USER_CLOSED, ErrorCodes.USER_CLOSED);
        }
    }
}

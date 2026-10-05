package com.almotawaj.wallet.service;

import com.almotawaj.wallet.config.constants.ErrorCodes;
import com.almotawaj.wallet.config.constants.ErrorMessages;
import com.almotawaj.wallet.config.constants.LogMessages;
import com.almotawaj.wallet.exception.BusinessRuleException;
import com.almotawaj.wallet.exception.InformationNotFoundException;
import com.almotawaj.wallet.model.Permission;
import com.almotawaj.wallet.model.User;
import com.almotawaj.wallet.model.UserRole;
import com.almotawaj.wallet.model.response.PageResponse;
import com.almotawaj.wallet.model.response.StaffPermissionsResponse;
import com.almotawaj.wallet.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class PermissionService {
    private static final List<UserRole> STAFF_ROLES = List.of(UserRole.ADMIN, UserRole.MERCHANT);

    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public PageResponse<StaffPermissionsResponse> listStaff(UserRole role, Pageable pageable) {
        List<UserRole> roles = role == null ? STAFF_ROLES : List.of(role);
        return PageResponse.from(userRepository.findByRoleIn(roles, pageable), StaffPermissionsResponse::from);
    }

    @Transactional
    public StaffPermissionsResponse grant(UUID actorId, UUID userId, Permission permission) {
        User user = findEditableUser(userId);
        if (!permission.isGrantableTo(user.getRole())) {
            throw new BusinessRuleException(ErrorMessages.PERMISSION_NOT_GRANTABLE, ErrorCodes.PERMISSION_NOT_GRANTABLE);
        }
        if (user.getPermissions().add(permission)) {
            log.info(LogMessages.PERMISSION_GRANTED, actorId, permission, userId);
        }
        return StaffPermissionsResponse.from(user);
    }

    @Transactional
    public StaffPermissionsResponse revoke(UUID actorId, UUID userId, Permission permission) {
        User user = findEditableUser(userId);
        if (user.getPermissions().remove(permission)) {
            log.info(LogMessages.PERMISSION_REVOKED, actorId, permission, userId);
        }
        return StaffPermissionsResponse.from(user);
    }

    private User findEditableUser(UUID userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new InformationNotFoundException(ErrorMessages.USER_NOT_FOUND));
        if (user.getRole() == UserRole.SUPER_ADMIN) {
            throw new BusinessRuleException(ErrorMessages.SUPER_ADMIN_PERMISSIONS_FIXED, ErrorCodes.SUPER_ADMIN_PERMISSIONS_FIXED);
        }
        return user;
    }
}

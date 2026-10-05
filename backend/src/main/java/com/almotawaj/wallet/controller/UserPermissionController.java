package com.almotawaj.wallet.controller;

import com.almotawaj.wallet.config.constants.ApiPaths;
import com.almotawaj.wallet.config.constants.SecurityConstants;
import com.almotawaj.wallet.config.security.MyUserDetails;
import com.almotawaj.wallet.model.Permission;
import com.almotawaj.wallet.model.response.AdminUserResponse;
import com.almotawaj.wallet.service.PermissionService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping(ApiPaths.ADMIN_USERS)
@PreAuthorize(SecurityConstants.HAS_ROLE_SUPER_ADMIN)
@RequiredArgsConstructor
public class UserPermissionController {
    private final PermissionService permissionService;

    @PutMapping(ApiPaths.USER_PERMISSION)
    public AdminUserResponse grant(@AuthenticationPrincipal MyUserDetails actor, @PathVariable UUID userId,
                                   @PathVariable Permission permission) {
        return permissionService.grant(actor.user().getId(), userId, permission);
    }

    @DeleteMapping(ApiPaths.USER_PERMISSION)
    public AdminUserResponse revoke(@AuthenticationPrincipal MyUserDetails actor, @PathVariable UUID userId,
                                    @PathVariable Permission permission) {
        return permissionService.revoke(actor.user().getId(), userId, permission);
    }
}

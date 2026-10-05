package com.almotawaj.wallet.controller;

import com.almotawaj.wallet.config.constants.ApiPaths;
import com.almotawaj.wallet.config.constants.SecurityConstants;
import com.almotawaj.wallet.config.security.MyUserDetails;
import com.almotawaj.wallet.model.Permission;
import com.almotawaj.wallet.model.UserRole;
import com.almotawaj.wallet.model.response.PageResponse;
import com.almotawaj.wallet.model.response.StaffPermissionsResponse;
import com.almotawaj.wallet.service.PermissionService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping(ApiPaths.ADMIN_STAFF)
@PreAuthorize(SecurityConstants.HAS_ROLE_SUPER_ADMIN)
@RequiredArgsConstructor
public class StaffPermissionController {
    private final PermissionService permissionService;

    @GetMapping
    public PageResponse<StaffPermissionsResponse> list(@RequestParam(required = false) UserRole role,
                                                       @PageableDefault(sort = "emailAddress") Pageable pageable) {
        return permissionService.listStaff(role, pageable);
    }

    @PutMapping(ApiPaths.STAFF_PERMISSION)
    public StaffPermissionsResponse grant(@AuthenticationPrincipal MyUserDetails actor, @PathVariable UUID userId,
                                          @PathVariable Permission permission) {
        return permissionService.grant(actor.user().getId(), userId, permission);
    }

    @DeleteMapping(ApiPaths.STAFF_PERMISSION)
    public StaffPermissionsResponse revoke(@AuthenticationPrincipal MyUserDetails actor, @PathVariable UUID userId,
                                           @PathVariable Permission permission) {
        return permissionService.revoke(actor.user().getId(), userId, permission);
    }
}

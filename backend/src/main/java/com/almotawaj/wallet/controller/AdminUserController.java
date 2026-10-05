package com.almotawaj.wallet.controller;

import com.almotawaj.wallet.config.constants.ApiPaths;
import com.almotawaj.wallet.config.constants.SecurityConstants;
import com.almotawaj.wallet.config.security.MyUserDetails;
import com.almotawaj.wallet.model.UserRole;
import com.almotawaj.wallet.model.UserStatus;
import com.almotawaj.wallet.model.request.CreateUserRequest;
import com.almotawaj.wallet.model.request.UpdateUserContactRequest;
import com.almotawaj.wallet.model.response.AdminUserResponse;
import com.almotawaj.wallet.model.response.AdminUserSummaryResponse;
import com.almotawaj.wallet.model.response.PageResponse;
import com.almotawaj.wallet.service.UserCreationService;
import com.almotawaj.wallet.service.UserManagementService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping(ApiPaths.ADMIN_USERS)
@PreAuthorize(SecurityConstants.HAS_USER_MANAGE)
@RequiredArgsConstructor
public class AdminUserController {
    private final UserManagementService userManagementService;
    private final UserCreationService userCreationService;

    @GetMapping
    public PageResponse<AdminUserSummaryResponse> list(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) UserRole role,
            @RequestParam(required = false) UserStatus status,
            @PageableDefault(sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {
        return userManagementService.list(search, role, status, pageable);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public AdminUserResponse create(@AuthenticationPrincipal MyUserDetails actor, @Valid @RequestBody CreateUserRequest request) {
        return userCreationService.create(actor.user(), request);
    }

    @GetMapping(ApiPaths.USER_BY_ID)
    public AdminUserResponse get(@PathVariable UUID userId) {
        return userManagementService.get(userId);
    }

    @PatchMapping(ApiPaths.USER_BY_ID)
    public AdminUserResponse updateContact(@AuthenticationPrincipal MyUserDetails actor, @PathVariable UUID userId,
                                           @Valid @RequestBody UpdateUserContactRequest request) {
        return userManagementService.updateContact(actor.user(), userId, request);
    }

    @PostMapping(ApiPaths.USER_SUSPEND)
    public AdminUserResponse suspend(@AuthenticationPrincipal MyUserDetails actor, @PathVariable UUID userId) {
        return userManagementService.suspend(actor.user(), userId);
    }

    @PostMapping(ApiPaths.USER_REACTIVATE)
    public AdminUserResponse reactivate(@AuthenticationPrincipal MyUserDetails actor, @PathVariable UUID userId) {
        return userManagementService.reactivate(actor.user(), userId);
    }

    @DeleteMapping(ApiPaths.USER_BY_ID)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void close(@AuthenticationPrincipal MyUserDetails actor, @PathVariable UUID userId) {
        userManagementService.close(actor.user(), userId);
    }
}

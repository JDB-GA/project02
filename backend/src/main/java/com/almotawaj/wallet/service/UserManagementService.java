package com.almotawaj.wallet.service;

import com.almotawaj.wallet.config.constants.ErrorCodes;
import com.almotawaj.wallet.config.constants.ErrorMessages;
import com.almotawaj.wallet.config.constants.LogMessages;
import com.almotawaj.wallet.exception.BusinessRuleException;
import com.almotawaj.wallet.exception.InformationExistException;
import com.almotawaj.wallet.exception.InformationNotFoundException;
import com.almotawaj.wallet.model.User;
import com.almotawaj.wallet.model.UserRole;
import com.almotawaj.wallet.model.UserStatus;
import com.almotawaj.wallet.model.request.UpdateUserContactRequest;
import com.almotawaj.wallet.model.response.AdminUserResponse;
import com.almotawaj.wallet.model.response.AdminUserSummaryResponse;
import com.almotawaj.wallet.model.response.PageResponse;
import com.almotawaj.wallet.repository.UserRepository;
import com.almotawaj.wallet.repository.specification.UserSpecifications;
import com.almotawaj.wallet.util.LoginIdentifier;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserManagementService {
    private final UserRepository userRepository;
    private final UserManagementPolicy policy;
    private final AdminUserMapper mapper;

    @Transactional(readOnly = true)
    public PageResponse<AdminUserSummaryResponse> list(String search, UserRole role, UserStatus status, Pageable pageable) {
        return PageResponse.from(userRepository.findAll(UserSpecifications.matches(search, role, status), pageable),
                AdminUserSummaryResponse::from);
    }

    @Transactional(readOnly = true)
    public AdminUserResponse get(UUID userId) {
        return mapper.toResponse(findUser(userId));
    }

    @Transactional
    public AdminUserResponse updateContact(User actor, UUID userId, UpdateUserContactRequest request) {
        User target = findManageableUser(actor, userId);
        if (request.email() != null) {
            changeEmail(target, LoginIdentifier.normalizeEmail(request.email()));
        }
        if (request.mobileNumber() != null) {
            changeMobile(target, LoginIdentifier.normalizeMobile(request.mobileNumber()));
        }
        log.info(LogMessages.USER_CONTACT_UPDATED, actor.getId(), userId);
        return mapper.toResponse(target);
    }

    @Transactional
    public AdminUserResponse suspend(User actor, UUID userId) {
        return changeStatus(actor, userId, Set.of(UserStatus.ACTIVE, UserStatus.LOCKED), UserStatus.SUSPENDED);
    }

    @Transactional
    public AdminUserResponse reactivate(User actor, UUID userId) {
        return changeStatus(actor, userId, Set.of(UserStatus.SUSPENDED, UserStatus.LOCKED), UserStatus.ACTIVE);
    }

    @Transactional
    public void close(User actor, UUID userId) {
        changeStatus(actor, userId, Set.of(UserStatus.ACTIVE, UserStatus.SUSPENDED, UserStatus.LOCKED), UserStatus.CLOSED);
    }

    private AdminUserResponse changeStatus(User actor, UUID userId, Set<UserStatus> allowedFrom, UserStatus next) {
        User target = findManageableUser(actor, userId);
        UserStatus previous = target.getStatus();
        if (!allowedFrom.contains(previous)) {
            throw new BusinessRuleException(ErrorMessages.INVALID_STATUS_TRANSITION, ErrorCodes.INVALID_STATUS_TRANSITION);
        }
        target.setStatus(next);
        log.info(LogMessages.USER_STATUS_CHANGED, actor.getId(), userId, previous, next);
        return mapper.toResponse(target);
    }

    private void changeEmail(User target, String email) {
        if (email.equals(target.getEmailAddress())) {
            return;
        }
        if (userRepository.existsByEmailAddress(email)) {
            throw new InformationExistException(ErrorMessages.EMAIL_ALREADY_REGISTERED, ErrorCodes.EMAIL_ALREADY_REGISTERED);
        }
        target.setEmailAddress(email);
        target.setEmailVerified(false);
    }

    private void changeMobile(User target, String mobileNumber) {
        if (mobileNumber.equals(target.getMobileNumber())) {
            return;
        }
        if (userRepository.existsByMobileNumber(mobileNumber)) {
            throw new InformationExistException(ErrorMessages.MOBILE_ALREADY_REGISTERED, ErrorCodes.MOBILE_ALREADY_REGISTERED);
        }
        target.setMobileNumber(mobileNumber);
    }

    private User findManageableUser(User actor, UUID userId) {
        User target = userRepository.findByIdForUpdate(userId)
                .orElseThrow(() -> new InformationNotFoundException(ErrorMessages.USER_NOT_FOUND));
        policy.ensureCanManage(actor, target);
        return target;
    }

    private User findUser(UUID userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new InformationNotFoundException(ErrorMessages.USER_NOT_FOUND));
    }
}

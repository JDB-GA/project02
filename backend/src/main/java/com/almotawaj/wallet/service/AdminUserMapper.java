package com.almotawaj.wallet.service;

import com.almotawaj.wallet.model.KycApplication;
import com.almotawaj.wallet.model.User;
import com.almotawaj.wallet.model.response.AdminUserResponse;
import com.almotawaj.wallet.repository.KycApplicationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AdminUserMapper {
    private final KycApplicationRepository applicationRepository;

    public AdminUserResponse toResponse(User user) {
        String fullName = applicationRepository.findFirstByUserIdOrderByCreatedAtDesc(user.getId())
                .map(KycApplication::getFullName)
                .orElse(null);
        return AdminUserResponse.from(user, fullName);
    }
}

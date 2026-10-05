package com.almotawaj.wallet.service;

import com.almotawaj.wallet.config.constants.ValidationLimits;
import com.almotawaj.wallet.config.constants.WalletConstants;
import com.almotawaj.wallet.model.KycApplication;
import com.almotawaj.wallet.model.KycApplicationStatus;
import com.almotawaj.wallet.model.User;
import com.almotawaj.wallet.repository.KycApplicationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class WalletHolderNames {
    private final KycApplicationRepository kycApplicationRepository;

    public String fullName(User user) {
        String name = kycApplicationRepository
                .findFirstByUserIdAndStatusOrderByCreatedAtDesc(user.getId(), KycApplicationStatus.APPROVED)
                .map(KycApplication::getFullName)
                .orElse(user.getEmailAddress());
        return name.length() <= ValidationLimits.COUNTERPARTY_NAME_MAX
                ? name
                : name.substring(0, ValidationLimits.COUNTERPARTY_NAME_MAX);
    }

    public String maskedName(User user) {
        String[] parts = fullName(user).trim().split("\\s+");
        if (parts.length < 2 || parts[0].contains(WalletConstants.EMAIL_MARKER)) {
            return maskedEmail(user);
        }
        return parts[0] + " " + parts[parts.length - 1].charAt(0) + WalletConstants.NAME_INITIAL_SUFFIX;
    }

    public String maskedEmail(User user) {
        String email = user.getEmailAddress();
        int at = email.indexOf(WalletConstants.EMAIL_MARKER);
        return email.charAt(0) + WalletConstants.EMAIL_MASK + email.substring(at);
    }
}

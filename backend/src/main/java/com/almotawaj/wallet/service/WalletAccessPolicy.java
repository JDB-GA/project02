package com.almotawaj.wallet.service;

import com.almotawaj.wallet.config.constants.ErrorCodes;
import com.almotawaj.wallet.config.constants.ErrorMessages;
import com.almotawaj.wallet.exception.BusinessRuleException;
import com.almotawaj.wallet.model.KycStatus;
import com.almotawaj.wallet.model.User;
import com.almotawaj.wallet.model.UserRole;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Component;

@Component
public class WalletAccessPolicy {
    public void ensureCanUseWallet(User user) {
        if (user.getRole() == UserRole.MERCHANT) {
            return;
        }
        if (user.getRole() != UserRole.CLIENT) {
            throw new AccessDeniedException(ErrorMessages.ACCESS_DENIED);
        }
        if (user.getKycStatus() != KycStatus.APPROVED) {
            throw new BusinessRuleException(ErrorMessages.WALLET_KYC_REQUIRED, ErrorCodes.WALLET_KYC_REQUIRED);
        }
    }
}

package com.almotawaj.wallet.service;

import com.almotawaj.wallet.config.constants.LogMessages;
import com.almotawaj.wallet.config.constants.SeedConstants;
import com.almotawaj.wallet.model.User;
import com.almotawaj.wallet.repository.AuditLogRepository;
import com.almotawaj.wallet.repository.KycApplicationRepository;
import com.almotawaj.wallet.repository.KycDocumentRepository;
import com.almotawaj.wallet.repository.OtpChallengeRepository;
import com.almotawaj.wallet.repository.PaymentRequestRepository;
import com.almotawaj.wallet.repository.UserRepository;
import com.almotawaj.wallet.repository.WalletRepository;
import com.almotawaj.wallet.repository.WalletTransactionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class SeedDataCleanupService {
    private final UserRepository userRepository;
    private final WalletTransactionRepository transactionRepository;
    private final WalletRepository walletRepository;
    private final KycApplicationRepository applicationRepository;
    private final KycDocumentRepository documentRepository;
    private final OtpChallengeRepository otpChallengeRepository;
    private final PaymentRequestRepository paymentRequestRepository;
    private final AuditLogRepository auditLogRepository;
    private final FileStorageService fileStorageService;

    @Transactional
    public void clean() {
        List<User> users = userRepository.findAllByEmailAddressIn(SeedConstants.accountEmails());
        List<UUID> userIds = users.stream().map(User::getId).toList();
        if (userIds.isEmpty()) {
            return;
        }

        documentRepository.findAllByApplicationUserIdIn(userIds)
                .forEach(document -> fileStorageService.deleteAfterCommit(document.getStorageKey()));
        auditLogRepository.clearActorsByIdIn(userIds);
        applicationRepository.clearReviewersByIdIn(userIds);
        otpChallengeRepository.deleteAllByUserIdIn(userIds);
        paymentRequestRepository.deleteAllByUserIdIn(userIds);
        transactionRepository.deleteAllByWalletUserIdIn(userIds);
        walletRepository.deleteAllByUserIdIn(userIds);
        documentRepository.deleteAllByApplicationUserIdIn(userIds);
        applicationRepository.deleteAllByUserIdIn(userIds);
        users.forEach(user -> user.getPermissions().clear());
        userRepository.flush();
        userRepository.deleteAllInBatch(users);
        log.info(LogMessages.SEED_DATA_CLEANED, users.size());
    }
}

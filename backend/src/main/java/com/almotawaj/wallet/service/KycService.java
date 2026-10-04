package com.almotawaj.wallet.service;

import com.almotawaj.wallet.config.constants.ErrorCodes;
import com.almotawaj.wallet.config.constants.ErrorMessages;
import com.almotawaj.wallet.config.constants.KycConstants;
import com.almotawaj.wallet.config.constants.LogMessages;
import com.almotawaj.wallet.exception.BusinessRuleException;
import com.almotawaj.wallet.exception.InformationExistException;
import com.almotawaj.wallet.exception.InformationNotFoundException;
import com.almotawaj.wallet.model.DocumentContent;
import com.almotawaj.wallet.model.KycApplication;
import com.almotawaj.wallet.model.KycDocument;
import com.almotawaj.wallet.model.KycStatus;
import com.almotawaj.wallet.model.User;
import com.almotawaj.wallet.model.request.KycSubmitRequest;
import com.almotawaj.wallet.model.response.KycApplicationResponse;
import com.almotawaj.wallet.repository.KycApplicationRepository;
import com.almotawaj.wallet.repository.KycDocumentRepository;
import com.almotawaj.wallet.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Clock;
import java.time.LocalDate;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class KycService {
    private final KycApplicationRepository applicationRepository;
    private final KycDocumentRepository documentRepository;
    private final UserRepository userRepository;
    private final KycApplicationFactory applicationFactory;
    private final FileStorageService fileStorageService;
    private final Clock clock;

    @Transactional(readOnly = true)
    public KycApplicationResponse getLatest(UUID userId) {
        return applicationRepository.findFirstByUserIdOrderByCreatedAtDesc(userId)
                .map(KycApplicationResponse::from)
                .orElseThrow(() -> new InformationNotFoundException(ErrorMessages.KYC_NOT_FOUND));
    }

    @Transactional
    public KycApplicationResponse submit(UUID userId, KycSubmitRequest request) {
        User user = userRepository.findByIdForUpdate(userId)
                .orElseThrow(() -> new InformationNotFoundException(ErrorMessages.USER_NOT_FOUND));
        ensureCanSubmit(user, request);

        KycApplication application = applicationRepository.saveAndFlush(applicationFactory.create(user, request));
        user.setKycStatus(KycStatus.PENDING);
        log.info(LogMessages.KYC_SUBMITTED, userId, application.getId());
        return KycApplicationResponse.from(application);
    }

    @Transactional(readOnly = true)
    public DocumentContent loadDocument(UUID userId, UUID documentId) {
        KycDocument document = documentRepository.findByIdAndApplicationUserId(documentId, userId)
                .orElseThrow(() -> new InformationNotFoundException(ErrorMessages.DOCUMENT_NOT_FOUND));
        return new DocumentContent(fileStorageService.load(document.getStorageKey()), document.getContentType());
    }

    private void ensureCanSubmit(User user, KycSubmitRequest request) {
        if (user.getKycStatus() == KycStatus.PENDING) {
            throw new InformationExistException(ErrorMessages.KYC_ALREADY_PENDING, ErrorCodes.KYC_ALREADY_PENDING);
        }
        if (user.getKycStatus() == KycStatus.APPROVED) {
            throw new InformationExistException(ErrorMessages.KYC_ALREADY_APPROVED, ErrorCodes.KYC_ALREADY_APPROVED);
        }
        if (applicationRepository.existsByCprNumberAndStatusInAndUserIdNot(
                request.cprNumber(), KycConstants.CPR_BLOCKING_STATUSES, user.getId())) {
            throw new InformationExistException(ErrorMessages.CPR_ALREADY_USED, ErrorCodes.CPR_ALREADY_USED);
        }

        LocalDate today = LocalDate.now(clock);
        if (request.dateOfBirth().plusYears(KycConstants.MINIMUM_AGE_YEARS).isAfter(today)) {
            throw new BusinessRuleException(ErrorMessages.KYC_UNDERAGE, ErrorCodes.KYC_UNDERAGE);
        }
        if (!request.cprExpiryDate().isAfter(today) || !request.passportExpiryDate().isAfter(today)) {
            throw new BusinessRuleException(ErrorMessages.DOCUMENT_EXPIRED, ErrorCodes.DOCUMENT_EXPIRED);
        }
    }
}

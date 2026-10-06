package com.almotawaj.wallet.service;

import com.almotawaj.wallet.config.constants.ErrorCodes;
import com.almotawaj.wallet.config.constants.ErrorMessages;
import com.almotawaj.wallet.config.constants.NotificationConstants;
import com.almotawaj.wallet.exception.BusinessRuleException;
import com.almotawaj.wallet.exception.InformationNotFoundException;
import com.almotawaj.wallet.model.PaymentRequest;
import com.almotawaj.wallet.model.PaymentRequestStatus;
import com.almotawaj.wallet.model.User;
import com.almotawaj.wallet.model.request.CreatePaymentRequest;
import com.almotawaj.wallet.model.request.TransferRequest;
import com.almotawaj.wallet.model.response.PageResponse;
import com.almotawaj.wallet.model.response.PaymentRequestResponse;
import com.almotawaj.wallet.model.response.WalletTransactionResponse;
import com.almotawaj.wallet.repository.PaymentRequestRepository;
import com.almotawaj.wallet.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.TransactionSynchronization;
import org.springframework.transaction.support.TransactionSynchronizationManager;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PaymentRequestService {

    private final PaymentRequestRepository requestRepository;
    private final UserRepository userRepository;
    private final RecipientResolver recipientResolver;
    private final TransferService transferService;
    private final NotificationHub notificationHub;
    private final WalletHolderNames names;

    @Transactional(readOnly = true)
    public PageResponse<PaymentRequestResponse> list(UUID userId, Pageable pageable) {
        Page<PaymentRequest> page = requestRepository.findByRequesterIdOrPayerId(userId, pageable);

        return PageResponse.from(page, request -> PaymentRequestResponse.from(request, names));
    }

    @Transactional
    public PaymentRequestResponse create(UUID requesterId, CreatePaymentRequest request) {
        User payer = recipientResolver.resolve(requesterId, request.payer());

        PaymentRequest paymentRequest = new PaymentRequest();
        paymentRequest.setRequester(userRepository.getReferenceById(requesterId));
        paymentRequest.setPayer(payer);
        paymentRequest.setAmount(request.amount());
        paymentRequest.setNote(request.note() != null ? request.note().strip() : null);

        paymentRequest = requestRepository.saveAndFlush(paymentRequest);

        PaymentRequestResponse response = PaymentRequestResponse.from(paymentRequest, names);

        sendAfterCommit(payer.getId(), NotificationConstants.PAYMENT_REQUESTED, response);

        sendAfterCommit(requesterId, NotificationConstants.PAYMENT_REQUEST_UPDATED, response);

        return response;
    }

    @Transactional
    public WalletTransactionResponse pay(UUID payerId, UUID requestId) {
        PaymentRequest request = requestRepository.findByIdAndPayerId(requestId, payerId).orElseThrow(() -> new InformationNotFoundException(ErrorMessages.PAYMENT_REQUEST_NOT_FOUND, ErrorCodes.PAYMENT_REQUEST_NOT_FOUND));

        ensurePending(request);

        TransferRequest transferRequest = new TransferRequest(request.getRequester().getEmailAddress(), request.getAmount(), request.getNote());

        WalletTransactionResponse transaction = transferService.transfer(payerId, transferRequest);

        request.setStatus(PaymentRequestStatus.PAID);
        requestRepository.saveAndFlush(request);

        notifyBoth(request);

        return transaction;
    }

    @Transactional
    public PaymentRequestResponse decline(UUID payerId, UUID requestId) {
        PaymentRequest request = requestRepository.findByIdAndPayerId(requestId, payerId).orElseThrow(() -> new InformationNotFoundException(ErrorMessages.PAYMENT_REQUEST_NOT_FOUND, ErrorCodes.PAYMENT_REQUEST_NOT_FOUND));

        return changeStatus(request, PaymentRequestStatus.DECLINED);
    }

    @Transactional
    public PaymentRequestResponse cancel(UUID requesterId, UUID requestId) {
        PaymentRequest request = requestRepository.findByIdAndRequesterId(requestId, requesterId).orElseThrow(() -> new InformationNotFoundException(ErrorMessages.PAYMENT_REQUEST_NOT_FOUND, ErrorCodes.PAYMENT_REQUEST_NOT_FOUND));

        return changeStatus(request, PaymentRequestStatus.CANCELLED);
    }

    private PaymentRequestResponse changeStatus(PaymentRequest request, PaymentRequestStatus status) {
        ensurePending(request);

        request.setStatus(status);
        requestRepository.saveAndFlush(request);

        return notifyBoth(request);
    }

    private void ensurePending(PaymentRequest request) {
        if (request.getStatus() != PaymentRequestStatus.PENDING) {
            throw new BusinessRuleException(ErrorMessages.PAYMENT_REQUEST_NOT_PENDING, ErrorCodes.PAYMENT_REQUEST_NOT_PENDING);
        }
    }

    private PaymentRequestResponse notifyBoth(PaymentRequest request) {
        PaymentRequestResponse response = PaymentRequestResponse.from(request, names);

        sendAfterCommit(request.getRequester().getId(), NotificationConstants.PAYMENT_REQUEST_UPDATED, response);

        sendAfterCommit(request.getPayer().getId(), NotificationConstants.PAYMENT_REQUEST_UPDATED, response);

        return response;
    }

    private void sendAfterCommit(UUID userId, String eventName, PaymentRequestResponse response) {
        TransactionSynchronizationManager.registerSynchronization(new TransactionSynchronization() {
            @Override
            public void afterCommit() {
                notificationHub.send(userId, eventName, response);
            }
        });
    }
}
package com.almotawaj.wallet.service;

import com.almotawaj.wallet.config.constants.ErrorCodes;
import com.almotawaj.wallet.config.constants.ErrorMessages;
import com.almotawaj.wallet.config.constants.WalletConstants;
import com.almotawaj.wallet.config.constants.WalletLimits;
import com.almotawaj.wallet.exception.BusinessRuleException;
import com.almotawaj.wallet.event.MoneyReceivedEvent;
import com.almotawaj.wallet.model.Counterparty;
import com.almotawaj.wallet.model.TransactionType;
import com.almotawaj.wallet.model.User;
import com.almotawaj.wallet.model.Wallet;
import com.almotawaj.wallet.model.WalletTransaction;
import com.almotawaj.wallet.model.request.TransferRequest;
import com.almotawaj.wallet.model.response.RecipientResponse;
import com.almotawaj.wallet.model.response.TransferOptionsResponse;
import com.almotawaj.wallet.model.response.WalletTransactionResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TransferService {
    private final WalletProvisioner provisioner;
    private final WalletLocker walletLocker;
    private final RecipientResolver recipientResolver;
    private final WalletHolderNames holderNames;
    private final DailyLimitPolicy dailyLimitPolicy;
    private final WalletLedger ledger;
    private final ApplicationEventPublisher eventPublisher;

    @Transactional(readOnly = true)
    public RecipientResponse findRecipient(UUID senderId, String query) {
        User recipient = recipientResolver.resolve(senderId, query);
        return new RecipientResponse(holderNames.maskedName(recipient), holderNames.maskedEmail(recipient), recipient.getRole());
    }

    @Transactional
    public TransferOptionsResponse getOptions(UUID senderId) {
        Wallet wallet = provisioner.getOrCreate(senderId);
        return new TransferOptionsResponse(wallet.getBalance(), new BigDecimal(WalletLimits.TRANSFER_MIN),
                new BigDecimal(WalletLimits.TRANSFER_MAX), DailyLimitPolicy.TRANSFER_LIMIT,
                dailyLimitPolicy.remainingTransfer(wallet.getId()));
    }

    @Transactional
    public WalletTransactionResponse transfer(UUID senderId, TransferRequest request) {
        User recipient = recipientResolver.resolve(senderId, request.recipient());
        UUID senderWalletId = provisioner.getOrCreate(senderId).getId();
        UUID recipientWalletId = provisioner.getOrCreate(recipient.getId()).getId();
        WalletLocker.LockedPair locked = walletLocker.lockPair(senderWalletId, recipientWalletId);
        Wallet sender = locked.source();
        Wallet receiver = locked.target();
        BigDecimal amount = request.amount();
        if (sender.getBalance().compareTo(amount) < 0) {
            throw new BusinessRuleException(ErrorMessages.INSUFFICIENT_BALANCE, ErrorCodes.INSUFFICIENT_BALANCE);
        }
        dailyLimitPolicy.ensureTransferAllowed(sender.getId(), amount);
        String note = request.note() == null || request.note().isBlank() ? null : request.note().strip();
        Counterparty senderDetails = counterparty(sender);
        WalletTransaction received = ledger.credit(receiver, TransactionType.TRANSFER_IN, amount, senderDetails, note);
        eventPublisher.publishEvent(new MoneyReceivedEvent(recipient.getId(), received.getAmount(), senderDetails.name(),
                received.getReference()));
        return WalletTransactionResponse.from(
                ledger.debit(sender, TransactionType.TRANSFER_OUT, amount, counterparty(receiver), note));
    }

    private Counterparty counterparty(Wallet wallet) {
        User user = wallet.getUser();
        return new Counterparty(holderNames.fullName(user), wallet.getIban(), WalletConstants.BANK_BIC,
                holderNames.maskedEmail(user), holderNames.maskedMobile(user));
    }
}
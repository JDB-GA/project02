package com.almotawaj.wallet.service;

import com.almotawaj.wallet.config.constants.ErrorCodes;
import com.almotawaj.wallet.config.constants.ErrorMessages;
import com.almotawaj.wallet.exception.BusinessRuleException;
import com.almotawaj.wallet.exception.InformationNotFoundException;
import com.almotawaj.wallet.model.Counterparty;
import com.almotawaj.wallet.model.TransactionType;
import com.almotawaj.wallet.model.Wallet;
import com.almotawaj.wallet.model.WalletTransaction;
import com.almotawaj.wallet.model.request.TopUpRequest;
import com.almotawaj.wallet.model.response.PageResponse;
import com.almotawaj.wallet.model.response.WalletResponse;
import com.almotawaj.wallet.model.response.WalletTransactionResponse;
import com.almotawaj.wallet.repository.WalletRepository;
import com.almotawaj.wallet.repository.WalletTransactionRepository;
import com.almotawaj.wallet.util.Iban;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class WalletService {
    private final WalletProvisioner provisioner;
    private final WalletRepository walletRepository;
    private final WalletTransactionRepository transactionRepository;
    private final WalletLedger ledger;

    @Transactional
    public WalletResponse getMine(UUID userId) {
        return WalletResponse.from(provisioner.getOrCreate(userId));
    }

    @Transactional
    public PageResponse<WalletTransactionResponse> listTransactions(UUID userId, TransactionType type, Pageable pageable) {
        Wallet wallet = provisioner.getOrCreate(userId);
        Page<WalletTransaction> page = type == null
                ? transactionRepository.findByWalletId(wallet.getId(), pageable)
                : transactionRepository.findByWalletIdAndType(wallet.getId(), type, pageable);
        return PageResponse.from(page, WalletTransactionResponse::from);
    }

    @Transactional
    public WalletTransactionResponse topUp(UUID userId, TopUpRequest request) {
        provisioner.getOrCreate(userId);
        Wallet wallet = walletRepository.findByUserIdForUpdate(userId)
                .orElseThrow(() -> new InformationNotFoundException(ErrorMessages.NOT_FOUND));
        String senderIban = Iban.normalize(request.senderIban());
        if (senderIban.equals(wallet.getIban())) {
            throw new BusinessRuleException(ErrorMessages.SELF_TRANSFER_NOT_ALLOWED, ErrorCodes.SELF_TRANSFER_NOT_ALLOWED);
        }
        Counterparty sender = new Counterparty(request.senderName().strip(), senderIban, request.senderBic());
        WalletTransaction transaction = ledger.credit(wallet, TransactionType.TOP_UP, request.amount(), sender,
                blankToNull(request.paymentReference()));
        return WalletTransactionResponse.from(transaction);
    }

    private static String blankToNull(String value) {
        return value == null || value.isBlank() ? null : value.strip();
    }
}

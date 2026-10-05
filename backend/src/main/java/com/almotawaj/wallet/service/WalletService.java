package com.almotawaj.wallet.service;

import com.almotawaj.wallet.config.constants.ErrorMessages;
import com.almotawaj.wallet.config.constants.WalletLimits;
import com.almotawaj.wallet.exception.InformationNotFoundException;
import com.almotawaj.wallet.model.Counterparty;
import com.almotawaj.wallet.model.TopUpSource;
import com.almotawaj.wallet.model.TransactionType;
import com.almotawaj.wallet.model.Wallet;
import com.almotawaj.wallet.model.WalletTransaction;
import com.almotawaj.wallet.model.request.TopUpRequest;
import com.almotawaj.wallet.model.response.*;
import com.almotawaj.wallet.repository.WalletRepository;
import com.almotawaj.wallet.repository.WalletTransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class WalletService {
    private final WalletProvisioner provisioner;
    private final WalletRepository walletRepository;
    private final WalletTransactionRepository transactionRepository;
    private final WalletLedger ledger;
    private final TopUpLimiter topUpLimiter;

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
    public TopUpOptionsResponse getTopUpOptions(UUID userId) {
        Wallet wallet = provisioner.getOrCreate(userId);
        return new TopUpOptionsResponse(
                Arrays.stream(TopUpSource.values()).map(TopUpSourceResponse::from).toList(),
                new BigDecimal(WalletLimits.TOP_UP_MIN),
                new BigDecimal(WalletLimits.TOP_UP_MAX),
                TopUpLimiter.DAILY_LIMIT,
                topUpLimiter.remainingToday(wallet.getId()));
    }

    @Transactional
    public WalletTransactionResponse topUp(UUID userId, TopUpRequest request) {
        provisioner.getOrCreate(userId);
        Wallet wallet = walletRepository.findByUserIdForUpdate(userId)
                .orElseThrow(() -> new InformationNotFoundException(ErrorMessages.NOT_FOUND));
        topUpLimiter.ensureWithinLimit(wallet.getId(), request.amount());
        TopUpSource source = request.source();
        Counterparty sender = new Counterparty(source.getHolderName(), source.getIban(), source.getBic());
        WalletTransaction transaction = ledger.credit(wallet, TransactionType.TOP_UP, request.amount(), sender,
                source.getBankName());
        return WalletTransactionResponse.from(transaction);
    }
}

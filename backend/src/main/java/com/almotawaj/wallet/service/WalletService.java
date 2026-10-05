package com.almotawaj.wallet.service;

import com.almotawaj.wallet.config.constants.WalletConstants;
import com.almotawaj.wallet.config.constants.WalletLimits;
import com.almotawaj.wallet.model.Counterparty;
import com.almotawaj.wallet.model.TopUpSource;
import com.almotawaj.wallet.model.TransactionType;
import com.almotawaj.wallet.model.Wallet;
import com.almotawaj.wallet.model.WalletTransaction;
import com.almotawaj.wallet.model.request.TopUpRequest;
import com.almotawaj.wallet.model.request.TransactionSearchRequest;
import com.almotawaj.wallet.model.response.*;
import com.almotawaj.wallet.repository.WalletTransactionRepository;
import com.almotawaj.wallet.repository.specification.WalletTransactionSpecifications;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.ZoneId;
import java.util.Arrays;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class WalletService {
    private static final ZoneId ZONE = ZoneId.of(WalletConstants.TIME_ZONE);

    private final WalletProvisioner provisioner;
    private final WalletLocker walletLocker;
    private final WalletTransactionRepository transactionRepository;
    private final WalletLedger ledger;
    private final DailyLimitPolicy dailyLimitPolicy;

    @Transactional
    public WalletResponse getMine(UUID userId) {
        return WalletResponse.from(provisioner.getOrCreate(userId));
    }

    @Transactional
    public PageResponse<WalletTransactionResponse> listTransactions(UUID userId, TransactionSearchRequest filter, Pageable pageable) {
        Wallet wallet = provisioner.getOrCreate(userId);
        Page<WalletTransaction> page = transactionRepository.findAll(
                WalletTransactionSpecifications.matches(wallet.getId(), filter, ZONE), pageable);
        return PageResponse.from(page, WalletTransactionResponse::from);
    }

    @Transactional
    public TopUpOptionsResponse getTopUpOptions(UUID userId) {
        Wallet wallet = provisioner.getOrCreate(userId);
        return new TopUpOptionsResponse(
                Arrays.stream(TopUpSource.values()).map(TopUpSourceResponse::from).toList(),
                new BigDecimal(WalletLimits.TOP_UP_MIN),
                new BigDecimal(WalletLimits.TOP_UP_MAX),
                DailyLimitPolicy.TOP_UP_LIMIT,
                dailyLimitPolicy.remainingTopUp(wallet.getId()));
    }

    @Transactional
    public WalletTransactionResponse topUp(UUID userId, TopUpRequest request) {
        Wallet wallet = walletLocker.lock(provisioner.getOrCreate(userId).getId());
        dailyLimitPolicy.ensureTopUpAllowed(wallet.getId(), request.amount());
        TopUpSource source = request.source();
        Counterparty sender = new Counterparty(source.getHolderName(), source.getIban(), source.getBic());
        WalletTransaction transaction = ledger.credit(wallet, TransactionType.TOP_UP, request.amount(), sender,
                source.getBankName());
        return WalletTransactionResponse.from(transaction);
    }
}

package com.almotawaj.wallet.service;

import com.almotawaj.wallet.config.constants.WalletConstants;
import com.almotawaj.wallet.config.constants.WalletLimits;
import com.almotawaj.wallet.event.MoneyReceivedEvent;
import com.almotawaj.wallet.model.AuditAction;
import com.almotawaj.wallet.model.AuditTargetType;
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
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.ZoneId;
import java.util.Arrays;
import java.util.UUID;

/**
 * Wallet operations for the signed-in holder: balance, ledger history and simulated incoming bank transfers.
 * A wallet is created on first access for users who are allowed to hold one.
 */
@Service
@RequiredArgsConstructor
public class WalletService {
    private static final ZoneId ZONE = ZoneId.of(WalletConstants.TIME_ZONE);

    private final WalletProvisioner provisioner;
    private final WalletLocker walletLocker;
    private final WalletTransactionRepository transactionRepository;
    private final WalletLedger ledger;
    private final DailyLimitPolicy dailyLimitPolicy;
    private final ApplicationEventPublisher eventPublisher;
    private final AuditService auditService;

    /**
     * Returns the wallet of the given user, creating it on first access.
     *
     * @param userId the wallet holder
     * @return the wallet with its IBAN, balance and currency
     */
    @Transactional
    public WalletResponse getMine(UUID userId) {
        return WalletResponse.from(provisioner.getOrCreate(userId));
    }

    /**
     * Lists the holder's ledger entries that match the filters.
     *
     * @param userId   the wallet holder
     * @param filter   optional search text, type, direction, date range (Bahrain time) and amount range
     * @param pageable page, size and sort order
     * @return one page of ledger entries
     */
    @Transactional
    public PageResponse<WalletTransactionResponse> listTransactions(UUID userId, TransactionSearchRequest filter, Pageable pageable) {
        Wallet wallet = provisioner.getOrCreate(userId);
        Page<WalletTransaction> page = transactionRepository.findAll(
                WalletTransactionSpecifications.forWallet(wallet.getId(), filter, ZONE), pageable);
        return PageResponse.from(page, WalletTransactionResponse::from);
    }

    /**
     * Returns the demo bank accounts a top-up can come from and the limits that apply to it.
     *
     * @param userId the wallet holder
     * @return the sources, the per-transfer range, the daily limit and what is left of it today
     */
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

    /**
     * Credits the wallet with a simulated incoming bank transfer. The wallet row is locked first so
     * concurrent top-ups cannot exceed the daily limit.
     *
     * @param userId  the wallet holder
     * @param request the source account and the amount
     * @return the ledger entry that was created
     * @throws com.almotawaj.wallet.exception.BusinessRuleException if the daily top-up limit would be exceeded
     */
    @Transactional
    public WalletTransactionResponse topUp(UUID userId, TopUpRequest request) {
        Wallet wallet = walletLocker.lock(provisioner.getOrCreate(userId).getId());
        dailyLimitPolicy.ensureTopUpAllowed(wallet.getId(), request.amount());
        TopUpSource source = request.source();
        Counterparty sender = new Counterparty(source.getHolderName(), source.getIban(), source.getBic(), null, null);
        WalletTransaction transaction = ledger.credit(wallet, TransactionType.TOP_UP, request.amount(), sender,
                source.getBankName());
        auditService.record(userId, AuditAction.TOP_UP_COMPLETED, AuditTargetType.WALLET_TRANSACTION,
                transaction.getId(), null);
        eventPublisher.publishEvent(new MoneyReceivedEvent(userId, transaction.getAmount(), sender.name(),
                transaction.getReference()));
        return WalletTransactionResponse.from(transaction);
    }
}

package com.almotawaj.wallet.service;

import com.almotawaj.wallet.config.constants.ErrorCodes;
import com.almotawaj.wallet.config.constants.ErrorMessages;
import com.almotawaj.wallet.config.constants.WalletLimits;
import com.almotawaj.wallet.config.constants.WalletConstants;
import com.almotawaj.wallet.exception.BusinessRuleException;
import com.almotawaj.wallet.model.TransactionType;
import com.almotawaj.wallet.repository.WalletTransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.Clock;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class TopUpLimiter {
    public static final BigDecimal DAILY_LIMIT = new BigDecimal(WalletLimits.DAILY_TOP_UP_LIMIT);
    private static final ZoneId ZONE = ZoneId.of(WalletConstants.TIME_ZONE);

    private final WalletTransactionRepository transactionRepository;
    private final Clock clock;

    public BigDecimal remainingToday(UUID walletId) {
        BigDecimal received = transactionRepository.sumAmountSince(walletId, TransactionType.TOP_UP, startOfToday());
        return DAILY_LIMIT.subtract(received).max(BigDecimal.ZERO);
    }

    public void ensureWithinLimit(UUID walletId, BigDecimal amount) {
        if (amount.compareTo(remainingToday(walletId)) > 0) {
            throw new BusinessRuleException(ErrorMessages.DAILY_TOP_UP_LIMIT_EXCEEDED, ErrorCodes.DAILY_TOP_UP_LIMIT_EXCEEDED);
        }
    }

    private Instant startOfToday() {
        return LocalDate.now(clock.withZone(ZONE)).atStartOfDay(ZONE).toInstant();
    }
}

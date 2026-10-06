package com.almotawaj.wallet.model;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public record StatementData(
        String ownerName,
        String iban,
        LocalDate from,
        LocalDate to,
        List<WalletTransaction> transactions,
        long totalTransactions,
        BigDecimal totalCredited,
        BigDecimal totalDebited
) {
}

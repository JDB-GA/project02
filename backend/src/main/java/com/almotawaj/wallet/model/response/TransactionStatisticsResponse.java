package com.almotawaj.wallet.model.response;

import java.math.BigDecimal;

public record TransactionStatisticsResponse(long totalTransactions, BigDecimal totalCredited, BigDecimal totalDebited) {
}

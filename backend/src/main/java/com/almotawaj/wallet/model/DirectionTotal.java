package com.almotawaj.wallet.model;

import java.math.BigDecimal;

public record DirectionTotal(TransactionDirection direction, Long count, BigDecimal amount) {
}

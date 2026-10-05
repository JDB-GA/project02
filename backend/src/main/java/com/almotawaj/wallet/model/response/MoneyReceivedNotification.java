package com.almotawaj.wallet.model.response;

import java.math.BigDecimal;

public record MoneyReceivedNotification(BigDecimal amount, String senderName, String reference) {
}

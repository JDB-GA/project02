package com.almotawaj.wallet.service;

import com.almotawaj.wallet.config.constants.ValidationLimits;
import com.almotawaj.wallet.model.Counterparty;
import com.almotawaj.wallet.model.TransactionDirection;
import com.almotawaj.wallet.model.TransactionType;
import com.almotawaj.wallet.model.Wallet;
import com.almotawaj.wallet.model.WalletTransaction;
import com.almotawaj.wallet.repository.WalletTransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.math.RoundingMode;

@Component
@RequiredArgsConstructor
public class WalletLedger {
    private final WalletTransactionRepository transactionRepository;
    private final TransactionReferenceGenerator referenceGenerator;

    public WalletTransaction credit(Wallet lockedWallet, TransactionType type, BigDecimal amount,
                                    Counterparty counterparty, String description) {
        BigDecimal scaled = amount.setScale(ValidationLimits.MONEY_SCALE, RoundingMode.UNNECESSARY);
        lockedWallet.setBalance(lockedWallet.getBalance().add(scaled));
        return record(lockedWallet, type, TransactionDirection.CREDIT, scaled, counterparty, description);
    }

    private WalletTransaction record(Wallet wallet, TransactionType type, TransactionDirection direction,
                                     BigDecimal amount, Counterparty counterparty, String description) {
        WalletTransaction transaction = new WalletTransaction();
        transaction.setWallet(wallet);
        transaction.setReference(referenceGenerator.next());
        transaction.setType(type);
        transaction.setDirection(direction);
        transaction.setAmount(amount);
        transaction.setBalanceAfter(wallet.getBalance());
        transaction.setCounterpartyName(counterparty.name());
        transaction.setCounterpartyIban(counterparty.iban());
        transaction.setCounterpartyBic(counterparty.bic());
        transaction.setDescription(description);
        return transactionRepository.save(transaction);
    }
}

package com.almotawaj.wallet.service;

import com.almotawaj.wallet.config.constants.ErrorCodes;
import com.almotawaj.wallet.exception.BusinessRuleException;
import com.almotawaj.wallet.model.TransactionType;
import com.almotawaj.wallet.model.Wallet;
import com.almotawaj.wallet.model.WalletTransaction;
import com.almotawaj.wallet.model.request.TopUpRequest;
import com.almotawaj.wallet.repository.WalletRepository;
import com.almotawaj.wallet.repository.WalletTransactionRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class WalletServiceTest {
    private static final UUID USER_ID = UUID.randomUUID();
    private static final String WALLET_IBAN = "BH02ALMT00000000001234";
    private static final String SENDER_IBAN = "BH67 BMAG 0000 1299 1234 56";

    @Mock
    private WalletProvisioner provisioner;
    @Mock
    private WalletRepository walletRepository;
    @Mock
    private WalletTransactionRepository transactionRepository;
    @Mock
    private TransactionReferenceGenerator referenceGenerator;

    private WalletService walletService;
    private Wallet wallet;

    @BeforeEach
    void setUp() {
        WalletLedger ledger = new WalletLedger(transactionRepository, referenceGenerator);
        walletService = new WalletService(provisioner, walletRepository, transactionRepository, ledger);
        wallet = new Wallet();
        wallet.setIban(WALLET_IBAN);
        wallet.setBalance(new BigDecimal("10.000"));
        when(walletRepository.findByUserIdForUpdate(USER_ID)).thenReturn(Optional.of(wallet));
    }

    private static TopUpRequest request(String senderIban, String amount) {
        return new TopUpRequest("Ali Hasan", senderIban, "BMAGBHBM", new BigDecimal(amount), "  ");
    }

    @Test
    void topUp_creditsBalanceAndRecordsTransaction() {
        when(referenceGenerator.next()).thenReturn("TXN-20261005-ABCDEFGH");
        when(transactionRepository.save(any(WalletTransaction.class))).thenAnswer(invocation -> invocation.getArgument(0));

        var response = walletService.topUp(USER_ID, request(SENDER_IBAN, "150.5"));

        assertThat(wallet.getBalance()).isEqualByComparingTo("160.500");
        assertThat(response.type()).isEqualTo(TransactionType.TOP_UP);
        assertThat(response.amount()).isEqualTo(new BigDecimal("150.500"));
        assertThat(response.balanceAfter()).isEqualByComparingTo("160.500");
        assertThat(response.counterpartyIban()).isEqualTo("BH67BMAG00001299123456");
        assertThat(response.description()).isNull();
    }

    @Test
    void topUp_rejectsOwnWalletIban() {
        assertThatThrownBy(() -> walletService.topUp(USER_ID, request(WALLET_IBAN, "5")))
                .isInstanceOf(BusinessRuleException.class)
                .hasFieldOrPropertyWithValue("code", ErrorCodes.SELF_TRANSFER_NOT_ALLOWED);
        assertThat(wallet.getBalance()).isEqualByComparingTo("10.000");
        verify(transactionRepository, never()).save(any());
    }
}

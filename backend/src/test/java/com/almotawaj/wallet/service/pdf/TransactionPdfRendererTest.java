package com.almotawaj.wallet.service.pdf;

import com.almotawaj.wallet.config.constants.LocaleConstants;
import com.almotawaj.wallet.model.StatementData;
import com.almotawaj.wallet.model.TransactionDirection;
import com.almotawaj.wallet.model.TransactionType;
import com.almotawaj.wallet.model.Wallet;
import com.almotawaj.wallet.model.WalletTransaction;
import com.lowagie.text.pdf.PdfReader;
import com.lowagie.text.pdf.parser.PdfTextExtractor;
import org.junit.jupiter.api.Test;
import org.springframework.context.support.ResourceBundleMessageSource;

import java.io.IOException;
import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.time.Clock;
import java.time.Instant;
import java.time.ZoneOffset;
import java.util.List;
import java.util.Locale;

import static org.assertj.core.api.Assertions.assertThat;

class TransactionPdfRendererTest {
    private static final Instant NOW = Instant.parse("2026-10-06T10:00:00Z");

    private final PdfFonts fonts = new PdfFonts();
    private final PdfDocuments documents = new PdfDocuments(fonts, Clock.fixed(NOW, ZoneOffset.UTC));

    @Test
    void receipt_containsTheTransactionInEnglish() throws IOException {
        byte[] pdf = new ReceiptPdfRenderer(documents, fonts).render(transaction(), "Sara Ali", labels(LocaleConstants.ENGLISH));

        assertThat(textOf(pdf)).contains("Transaction receipt", "TXN-20261006-AAAAAAAA", "+12.500 BHD", "Money received", "Sara Ali",
                "2026-10-06 13:00");
    }

    @Test
    void statement_listsEntriesAndTotalsInArabic() throws IOException {
        StatementData statement = new StatementData("سارة علي", "BH02ALMT00000000000001", null, null, List.of(transaction()), 1,
                new BigDecimal("12.500"), BigDecimal.ZERO);

        byte[] pdf = new StatementPdfRenderer(documents, fonts).render(statement, labels(LocaleConstants.ARABIC));

        assertThat(new PdfReader(pdf).getNumberOfPages()).isEqualTo(1);
        assertThat(textOf(pdf)).contains("TXN-20261006-AAAAAAAA", "2026-10-06 13:00", "62.500");
    }

    private static PdfLabels labels(Locale locale) {
        ResourceBundleMessageSource messages = new ResourceBundleMessageSource();
        messages.setBasename("messages");
        messages.setDefaultEncoding(StandardCharsets.UTF_8.name());
        messages.setFallbackToSystemLocale(false);
        return new PdfLabels(messages, locale);
    }

    private static String textOf(byte[] pdf) throws IOException {
        return new PdfTextExtractor(new PdfReader(pdf)).getTextFromPage(1);
    }

    private static WalletTransaction transaction() {
        Wallet wallet = new Wallet();
        wallet.setIban("BH02ALMT00000000000001");
        WalletTransaction transaction = new WalletTransaction();
        transaction.setWallet(wallet);
        transaction.setReference("TXN-20261006-AAAAAAAA");
        transaction.setType(TransactionType.TRANSFER_IN);
        transaction.setDirection(TransactionDirection.CREDIT);
        transaction.setAmount(new BigDecimal("12.500"));
        transaction.setBalanceAfter(new BigDecimal("62.500"));
        transaction.setCounterpartyName("Illia");
        transaction.setCreatedAt(NOW);
        return transaction;
    }
}

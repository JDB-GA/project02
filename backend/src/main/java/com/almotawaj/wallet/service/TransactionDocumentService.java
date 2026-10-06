package com.almotawaj.wallet.service;

import com.almotawaj.wallet.config.constants.ErrorCodes;
import com.almotawaj.wallet.config.constants.ErrorMessages;
import com.almotawaj.wallet.config.constants.PdfConstants;
import com.almotawaj.wallet.config.constants.WalletConstants;
import com.almotawaj.wallet.exception.InformationNotFoundException;
import com.almotawaj.wallet.model.AuditAction;
import com.almotawaj.wallet.model.AuditTargetType;
import com.almotawaj.wallet.model.DirectionTotal;
import com.almotawaj.wallet.model.PdfFile;
import com.almotawaj.wallet.model.StatementData;
import com.almotawaj.wallet.model.TransactionDirection;
import com.almotawaj.wallet.model.Wallet;
import com.almotawaj.wallet.model.WalletTransaction;
import com.almotawaj.wallet.model.request.TransactionSearchRequest;
import com.almotawaj.wallet.repository.TransactionTotalsRepository;
import com.almotawaj.wallet.repository.WalletTransactionRepository;
import com.almotawaj.wallet.repository.specification.WalletTransactionSpecifications;
import com.almotawaj.wallet.service.pdf.PdfLabels;
import com.almotawaj.wallet.service.pdf.ReceiptPdfRenderer;
import com.almotawaj.wallet.service.pdf.StatementPdfRenderer;
import lombok.RequiredArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Clock;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
import java.util.Locale;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TransactionDocumentService {
    private static final ZoneId ZONE = ZoneId.of(WalletConstants.TIME_ZONE);
    private static final PageRequest NEWEST_ROWS = PageRequest.of(0, PdfConstants.STATEMENT_MAX_ROWS, Sort.by(Sort.Direction.DESC, "createdAt"));

    private final WalletProvisioner provisioner;
    private final WalletTransactionRepository transactionRepository;
    private final TransactionTotalsRepository totalsRepository;
    private final WalletHolderNames names;
    private final ReceiptPdfRenderer receiptRenderer;
    private final StatementPdfRenderer statementRenderer;
    private final MessageSource messageSource;
    private final AuditService auditService;
    private final Clock clock;

    @Transactional
    public PdfFile receipt(UUID userId, UUID transactionId, Locale locale) {
        WalletTransaction transaction = transactionRepository.findByIdAndWalletUserId(transactionId, userId).orElseThrow(() ->
                new InformationNotFoundException(ErrorMessages.TRANSACTION_NOT_FOUND, ErrorCodes.TRANSACTION_NOT_FOUND));
        String ownerName = names.fullName(transaction.getWallet().getUser());
        byte[] content = receiptRenderer.render(transaction, ownerName, new PdfLabels(messageSource, locale));
        auditService.record(userId, AuditAction.RECEIPT_DOWNLOADED, AuditTargetType.WALLET_TRANSACTION, transactionId, null);
        return new PdfFile(PdfConstants.RECEIPT_FILE_NAME.formatted(transaction.getReference()), content);
    }

    @Transactional
    public PdfFile statement(UUID userId, TransactionSearchRequest filter, Locale locale) {
        Wallet wallet = provisioner.getOrCreate(userId);
        Specification<WalletTransaction> specification = WalletTransactionSpecifications.forWallet(wallet.getId(), filter, ZONE);
        Page<WalletTransaction> page = transactionRepository.findAll(specification, NEWEST_ROWS);
        List<DirectionTotal> totals = totalsRepository.totalsByDirection(specification);
        StatementData statement = new StatementData(names.fullName(wallet.getUser()), wallet.getIban(), filter.from(), filter.to(),
                page.getContent(), page.getTotalElements(), DirectionTotal.amountOf(totals, TransactionDirection.CREDIT),
                DirectionTotal.amountOf(totals, TransactionDirection.DEBIT));
        byte[] content = statementRenderer.render(statement, new PdfLabels(messageSource, locale));
        auditService.record(userId, AuditAction.STATEMENT_DOWNLOADED, AuditTargetType.USER, userId, null);
        return new PdfFile(PdfConstants.STATEMENT_FILE_NAME.formatted(LocalDate.now(clock.withZone(ZONE))), content);
    }
}

package com.almotawaj.wallet.service.pdf;

import com.almotawaj.wallet.config.constants.PdfConstants;
import com.almotawaj.wallet.model.StatementData;
import com.almotawaj.wallet.model.WalletTransaction;
import com.lowagie.text.PageSize;
import com.lowagie.text.pdf.PdfPTable;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class StatementPdfRenderer {
    private static final List<String> COLUMNS = List.of("date", "reference", "type", "counterparty", "amount", "balanceAfter");

    private final PdfDocuments documents;
    private final PdfFonts fonts;

    public byte[] render(StatementData statement, PdfLabels labels) {
        return documents.render(labels, labels.get("statement.title"), PageSize.A4.rotate(),
                List.of(summary(statement, labels), entries(statement, labels)));
    }

    private PdfPTable summary(StatementData statement, PdfLabels labels) {
        int direction = labels.runDirection();
        PdfPTable table = PdfCells.table(direction, PdfConstants.DETAIL_COLUMN_WIDTHS);
        table.addCell(PdfCells.text(labels.get("name"), fonts.muted(), direction));
        table.addCell(PdfCells.text(statement.ownerName(), fonts.strong(), direction));
        row(table, labels, "iban", statement.iban());
        period(table, statement, labels);
        row(table, labels, "statement.count", String.valueOf(statement.totalTransactions()));
        row(table, labels, "statement.credited", PdfFormats.money(statement.totalCredited()));
        row(table, labels, "statement.debited", PdfFormats.money(statement.totalDebited()));
        if (statement.totalTransactions() > statement.transactions().size()) {
            row(table, labels, "statement.shown", String.valueOf(statement.transactions().size()));
        }
        return table;
    }

    private PdfPTable entries(StatementData statement, PdfLabels labels) {
        int direction = labels.runDirection();
        PdfPTable table = PdfCells.table(direction, PdfConstants.STATEMENT_COLUMN_WIDTHS);
        table.setHeaderRows(1);
        COLUMNS.forEach(column -> table.addCell(PdfCells.header(labels.get(column), fonts.strong(), direction)));
        for (WalletTransaction transaction : statement.transactions()) {
            table.addCell(PdfCells.data(PdfFormats.dateTime(transaction.getCreatedAt()), fonts.body(), direction));
            table.addCell(PdfCells.data(transaction.getReference(), fonts.body(), direction));
            table.addCell(PdfCells.text(labels.type(transaction.getType()), fonts.body(), direction));
            table.addCell(PdfCells.text(transaction.getCounterpartyName(), fonts.body(), direction));
            table.addCell(PdfCells.data(PdfFormats.signedMoney(transaction), fonts.strong(), direction));
            table.addCell(PdfCells.data(PdfFormats.money(transaction.getBalanceAfter()), fonts.body(), direction));
        }
        return table;
    }

    private void row(PdfPTable table, PdfLabels labels, String key, String value) {
        table.addCell(PdfCells.text(labels.get(key), fonts.muted(), labels.runDirection()));
        table.addCell(PdfCells.data(value, fonts.strong(), labels.runDirection()));
    }

    private void period(PdfPTable table, StatementData statement, PdfLabels labels) {
        if (statement.from() == null && statement.to() == null) {
            table.addCell(PdfCells.text(labels.get("statement.period"), fonts.muted(), labels.runDirection()));
            table.addCell(PdfCells.text(labels.get("statement.allDates"), fonts.strong(), labels.runDirection()));
        }
        if (statement.from() != null) {
            row(table, labels, "statement.from", statement.from().toString());
        }
        if (statement.to() != null) {
            row(table, labels, "statement.to", statement.to().toString());
        }
    }
}

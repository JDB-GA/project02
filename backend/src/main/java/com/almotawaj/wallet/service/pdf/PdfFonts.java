package com.almotawaj.wallet.service.pdf;

import com.almotawaj.wallet.config.constants.PdfConstants;
import com.lowagie.text.Font;
import com.lowagie.text.pdf.BaseFont;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.UncheckedIOException;

@Component
public class PdfFonts {
    private final BaseFont regular = load(PdfConstants.REGULAR_FONT);
    private final BaseFont bold = load(PdfConstants.BOLD_FONT);

    public Font title() {
        return new Font(bold, PdfConstants.TITLE_SIZE);
    }

    public Font heading() {
        return new Font(bold, PdfConstants.HEADING_SIZE);
    }

    public Font body() {
        return new Font(regular, PdfConstants.BODY_SIZE);
    }

    public Font strong() {
        return new Font(bold, PdfConstants.BODY_SIZE);
    }

    public Font muted() {
        return new Font(regular, PdfConstants.BODY_SIZE, Font.NORMAL, PdfConstants.MUTED_COLOR);
    }

    private static BaseFont load(String path) {
        try {
            byte[] bytes = new ClassPathResource(path).getContentAsByteArray();
            return BaseFont.createFont(path, BaseFont.IDENTITY_H, BaseFont.EMBEDDED, true, bytes, null);
        } catch (IOException e) {
            throw new UncheckedIOException(e);
        }
    }
}

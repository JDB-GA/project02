package com.almotawaj.wallet.model.response;

import com.almotawaj.wallet.model.KycDocument;
import com.almotawaj.wallet.model.KycDocumentType;

import java.time.LocalDate;
import java.util.UUID;

public record KycDocumentResponse(
        UUID id,
        KycDocumentType type,
        LocalDate expiryDate,
        String contentType,
        long sizeBytes
) {
    public static KycDocumentResponse from(KycDocument document) {
        return new KycDocumentResponse(
                document.getId(),
                document.getType(),
                document.getExpiryDate(),
                document.getContentType(),
                document.getSizeBytes()
        );
    }
}

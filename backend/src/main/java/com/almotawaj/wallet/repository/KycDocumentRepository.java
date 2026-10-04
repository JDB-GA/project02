package com.almotawaj.wallet.repository;

import com.almotawaj.wallet.model.KycDocument;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface KycDocumentRepository extends JpaRepository<KycDocument, UUID> {
    Optional<KycDocument> findByIdAndApplicationUserId(UUID documentId, UUID userId);
}

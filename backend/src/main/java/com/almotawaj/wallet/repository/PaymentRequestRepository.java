package com.almotawaj.wallet.repository;

import com.almotawaj.wallet.model.PaymentRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;
import java.util.UUID;

public interface PaymentRequestRepository extends JpaRepository<PaymentRequest, UUID> {
    @EntityGraph(attributePaths = {"requester", "payer"})
    @Query("SELECT p FROM PaymentRequest p WHERE p.requester.id = :userId OR p.payer.id = :userId")
    Page<PaymentRequest> findByRequesterIdOrPayerId(UUID userId, Pageable pageable);

    @EntityGraph(attributePaths = {"requester", "payer"})
    Optional<PaymentRequest> findByIdAndPayerId(UUID id, UUID payerId);

    @EntityGraph(attributePaths = {"requester", "payer"})
    Optional<PaymentRequest> findByIdAndRequesterId(UUID id, UUID requesterId);
}
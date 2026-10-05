package com.almotawaj.wallet.repository;

import com.almotawaj.wallet.model.KycApplication;
import com.almotawaj.wallet.model.KycApplicationStatus;
import jakarta.persistence.LockModeType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;

import java.util.Collection;
import java.util.Optional;
import java.util.UUID;

public interface KycApplicationRepository extends JpaRepository<KycApplication, UUID> {
    @EntityGraph(attributePaths = "documents")
    Optional<KycApplication> findFirstByUserIdOrderByCreatedAtDesc(UUID userId);

    boolean existsByCprNumberAndStatusInAndUserIdNot(String cprNumber, Collection<KycApplicationStatus> statuses, UUID userId);

    @EntityGraph(attributePaths = "user")
    Page<KycApplication> findByStatus(KycApplicationStatus status, Pageable pageable);

    @EntityGraph(attributePaths = "user")
    Page<KycApplication> findAllBy(Pageable pageable);

    @EntityGraph(attributePaths = {"user", "documents", "reviewedBy"})
    Optional<KycApplication> findWithDetailsById(UUID id);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("select a from KycApplication a where a.id = :id")
    Optional<KycApplication> findByIdForUpdate(UUID id);
}

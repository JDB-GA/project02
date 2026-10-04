package com.almotawaj.wallet.repository;

import com.almotawaj.wallet.model.KycApplication;
import com.almotawaj.wallet.model.KycApplicationStatus;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.Optional;
import java.util.UUID;

public interface KycApplicationRepository extends JpaRepository<KycApplication, UUID> {
    @EntityGraph(attributePaths = "documents")
    Optional<KycApplication> findFirstByUserIdOrderByCreatedAtDesc(UUID userId);

    boolean existsByCprNumberAndStatusInAndUserIdNot(String cprNumber, Collection<KycApplicationStatus> statuses, UUID userId);
}

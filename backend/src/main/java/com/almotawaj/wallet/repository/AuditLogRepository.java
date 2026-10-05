package com.almotawaj.wallet.repository;

import com.almotawaj.wallet.model.AuditLog;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface AuditLogRepository extends JpaRepository<AuditLog, UUID> {
    @EntityGraph(attributePaths = "actor")
    Page<AuditLog> findAllBy(Pageable pageable);

    @EntityGraph(attributePaths = "actor")
    Page<AuditLog> findByAction(String action, Pageable pageable);

    @EntityGraph(attributePaths = "actor")
    Page<AuditLog> findByTargetId(UUID targetId, Pageable pageable);
}

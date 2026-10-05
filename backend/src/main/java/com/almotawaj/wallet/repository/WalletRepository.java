package com.almotawaj.wallet.repository;

import com.almotawaj.wallet.model.Wallet;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface WalletRepository extends JpaRepository<Wallet, UUID> {
    Optional<Wallet> findByUserId(UUID userId);

    boolean existsByIban(String iban);

    @EntityGraph(attributePaths = "user")
    Optional<Wallet> findByIban(String iban);
}

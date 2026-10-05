package com.almotawaj.wallet.repository;

import com.almotawaj.wallet.model.TransactionType;
import com.almotawaj.wallet.model.WalletTransaction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface WalletTransactionRepository extends JpaRepository<WalletTransaction, UUID> {
    Page<WalletTransaction> findByWalletId(UUID walletId, Pageable pageable);

    Page<WalletTransaction> findByWalletIdAndType(UUID walletId, TransactionType type, Pageable pageable);
}

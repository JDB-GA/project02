package com.almotawaj.wallet.repository;

import com.almotawaj.wallet.model.TransactionType;
import com.almotawaj.wallet.model.WalletTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.Collection;
import java.util.UUID;

public interface WalletTransactionRepository extends JpaRepository<WalletTransaction, UUID>,
        JpaSpecificationExecutor<WalletTransaction> {
    @Query("""
            select coalesce(sum(t.amount), 0) from WalletTransaction t
            where t.wallet.id = :walletId and t.type = :type and t.createdAt >= :since""")
    BigDecimal sumAmountSince(UUID walletId, TransactionType type, Instant since);

    @Modifying
    @Query("delete from WalletTransaction t where t.wallet.user.id in :userIds")
    void deleteAllByWalletUserIdIn(Collection<UUID> userIds);

    @Modifying
    @Query("delete from WalletTransaction t")
    void deleteAllTransactions();
}

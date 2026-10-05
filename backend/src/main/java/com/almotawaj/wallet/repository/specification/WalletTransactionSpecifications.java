package com.almotawaj.wallet.repository.specification;

import com.almotawaj.wallet.model.WalletTransaction;
import com.almotawaj.wallet.model.request.TransactionSearchRequest;
import org.springframework.data.jpa.domain.Specification;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.ZoneId;
import java.util.Locale;
import java.util.UUID;

public final class WalletTransactionSpecifications {
    private static final char LIKE_ESCAPE = '\\';

    private WalletTransactionSpecifications() {
    }

    public static Specification<WalletTransaction> matches(UUID walletId, TransactionSearchRequest filter, ZoneId zone) {
        return Specification.allOf(
                (root, query, builder) -> builder.equal(root.get("wallet").get("id"), walletId),
                equalTo("type", filter.type()),
                equalTo("direction", filter.direction()),
                createdFrom(filter.from() == null ? null : filter.from().atStartOfDay(zone).toInstant()),
                createdBefore(filter.to() == null ? null : filter.to().plusDays(1).atStartOfDay(zone).toInstant()),
                amountAtLeast(filter.minAmount()),
                amountAtMost(filter.maxAmount()),
                searchMatches(filter.search()));
    }

    private static Specification<WalletTransaction> equalTo(String attribute, Object value) {
        return (root, query, builder) -> value == null ? null : builder.equal(root.get(attribute), value);
    }

    private static Specification<WalletTransaction> createdFrom(Instant start) {
        return (root, query, builder) -> start == null ? null : builder.greaterThanOrEqualTo(root.get("createdAt"), start);
    }

    private static Specification<WalletTransaction> createdBefore(Instant end) {
        return (root, query, builder) -> end == null ? null : builder.lessThan(root.get("createdAt"), end);
    }

    private static Specification<WalletTransaction> amountAtLeast(BigDecimal min) {
        return (root, query, builder) -> min == null ? null : builder.greaterThanOrEqualTo(root.get("amount"), min);
    }

    private static Specification<WalletTransaction> amountAtMost(BigDecimal max) {
        return (root, query, builder) -> max == null ? null : builder.lessThanOrEqualTo(root.get("amount"), max);
    }

    private static Specification<WalletTransaction> searchMatches(String search) {
        return (root, query, builder) -> {
            if (search == null || search.isBlank()) {
                return null;
            }
            String pattern = "%" + escapeLike(search.strip().toLowerCase(Locale.ROOT)) + "%";
            return builder.or(
                    builder.like(builder.lower(root.get("counterpartyName")), pattern, LIKE_ESCAPE),
                    builder.like(builder.lower(root.get("reference")), pattern, LIKE_ESCAPE),
                    builder.like(builder.lower(root.get("description")), pattern, LIKE_ESCAPE));
        };
    }

    private static String escapeLike(String value) {
        return value.replace("\\", "\\\\").replace("%", "\\%").replace("_", "\\_");
    }
}

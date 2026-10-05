package com.almotawaj.wallet.config.constants;

import com.almotawaj.wallet.model.KycApplicationStatus;
import com.almotawaj.wallet.model.Permission;
import com.almotawaj.wallet.model.SeedAccount;
import com.almotawaj.wallet.model.UserRole;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

public final class SeedConstants {
    public static final String SEED_TOKEN_PROPERTY = "${seed-token:}";
    public static final String SEED_PASSWORD_PROPERTY = "${seed-password:}";

    public static final List<SeedAccount> ACCOUNTS = List.of(
            new SeedAccount("admin@almotawaj.com", "30000001", UserRole.SUPER_ADMIN, Set.of(), null, null, null),
            new SeedAccount("reviewer@almotawaj.com", "30000004", UserRole.ADMIN,
                    Set.of(Permission.KYC_REVIEW, Permission.USER_MANAGE), null, null, null),
            new SeedAccount("merchant@almotawaj.com", "30000003", UserRole.MERCHANT, Set.of(), null, null, null),
            new SeedAccount("client@almotawaj.com", "30000002", UserRole.CLIENT, Set.of(),
                    KycApplicationStatus.PENDING, "Ali Hasan", "900000001"),
            new SeedAccount("verified.client@almotawaj.com", "30000005", UserRole.CLIENT, Set.of(),
                    KycApplicationStatus.APPROVED, "Fatima Ahmed", "900000002"),
            new SeedAccount("rejected.client@almotawaj.com", "30000006", UserRole.CLIENT, Set.of(),
                    KycApplicationStatus.REJECTED, "Yousif Salman", "900000003"));

    public static final String REVIEWER_EMAIL = "admin@almotawaj.com";
    public static final String REJECTION_REASON = "The CPR copy is blurry. Please upload a clearer scan.";
    public static final LocalDate DATE_OF_BIRTH = LocalDate.of(1995, 1, 15);
    public static final String NATIONALITY = "BH";
    public static final String BLOCK = "338";
    public static final String ROAD = "3803";
    public static final String BUILDING = "1207";
    public static final String AREA = "Adliya";

    public static Set<String> accountEmails() {
        return ACCOUNTS.stream().map(SeedAccount::email).collect(java.util.stream.Collectors.toUnmodifiableSet());
    }

    private SeedConstants() {
    }
}

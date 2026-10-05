package com.almotawaj.wallet.config.constants.docs;

public final class WalletDocs {
    public static final String TAG = "Wallet";
    public static final String TAG_DESCRIPTION = "Wallet balance, IBAN, transaction history and simulated incoming bank transfers (clients with approved KYC and merchants)";

    public static final String MINE = "Get my wallet";
    public static final String MINE_DESCRIPTION = "Returns the IBAN and balance in BHD. The wallet is opened on first access. Clients need approved KYC.";
    public static final String MINE_OK = "Wallet details";
    public static final String KYC_REQUIRED = "Client identity is not verified yet (WALLET_KYC_REQUIRED)";

    public static final String TRANSACTIONS = "List my transactions";
    public static final String TRANSACTIONS_DESCRIPTION = "Newest first. Optional `type` filter: TOP_UP, PAYMENT, PAYMENT_RECEIVED, REFUND, REFUND_ISSUED.";
    public static final String TRANSACTIONS_OK = "Page of transactions";
    public static final String TRANSACTIONS_BAD_REQUEST = "Unknown type or sort field";

    public static final String TOP_UP = "Receive a bank transfer (simulated)";
    public static final String TOP_UP_DESCRIPTION = "Simulates an incoming transfer from an external bank account. The sender IBAN must pass the ISO 13616 checksum and the BIC must be 8 or 11 characters. Amount 0.001 – 5000.000 BHD with up to 3 decimals.";
    public static final String TOP_UP_CREATED = "Transfer credited; returns the transaction";
    public static final String TOP_UP_UNPROCESSABLE = "Identity not verified (WALLET_KYC_REQUIRED) or sender IBAN is the wallet's own (SELF_TRANSFER_NOT_ALLOWED)";

    private WalletDocs() {
    }
}

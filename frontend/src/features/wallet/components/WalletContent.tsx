import { useTranslation } from "react-i18next";

import { LoadErrorAlert } from "@/components/LoadErrorAlert";
import { Skeleton } from "@/components/ui/skeleton";

import { useWallet } from "../hooks/useWallet";
import { TransactionsCard } from "./TransactionsCard";
import { WalletBalanceCard } from "./WalletBalanceCard";

export function WalletContent() {
  const { t } = useTranslation("wallet");
  const { data: wallet, isPending, isError, refetch } = useWallet();

  if (isPending) {
    return <Skeleton className="h-40 w-full rounded-xl" />;
  }

  if (isError) {
    return (
      <LoadErrorAlert message={t("loadError")} onRetry={() => void refetch()} />
    );
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4">
      <WalletBalanceCard wallet={wallet} />
      <TransactionsCard />
    </div>
  );
}

import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import { KycDetailRow } from "@/features/kyc/components/KycDetailRow";
import { formatDateTime } from "@/features/kyc/utils/format-kyc-date";
import { useLanguage } from "@/hooks/useLanguage";
import { cn } from "@/lib/utils";
import type { Transaction } from "../types/wallet.types";
import { formatMoney } from "../utils/format-money";
import { formatIban } from "../utils/iban";

interface TransactionDetailsSheetProps {
  transaction: Transaction | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TransactionDetailsSheet({
  transaction,
  open,
  onOpenChange,
}: TransactionDetailsSheetProps) {
  const { t } = useTranslation("wallet");
  const { language } = useLanguage();
  const { data: user } = useCurrentUser();

  if (!transaction) {
    return null;
  }

  const isCredit = transaction.direction === "CREDIT";

  const counterpartySection = (
    <dl className="grid gap-x-4 gap-y-6 sm:grid-cols-2 mt-4">
      <KycDetailRow
        label={t("details.name")}
        value={transaction.counterpartyName}
      />
      {transaction.counterpartyEmail && (
        <KycDetailRow
          label={t("details.email")}
          value={transaction.counterpartyEmail}
          dir="ltr"
        />
      )}
      {transaction.counterpartyMobile && (
        <KycDetailRow
          label={t("details.mobileNumber")}
          value={transaction.counterpartyMobile}
          dir="ltr"
        />
      )}
      {transaction.counterpartyIban && (
        <KycDetailRow
          label={t("details.iban")}
          value={formatIban(transaction.counterpartyIban)}
          dir="ltr"
        />
      )}
      {transaction.counterpartyBic && (
        <KycDetailRow
          label={t("details.bic")}
          value={transaction.counterpartyBic}
          dir="ltr"
        />
      )}
    </dl>
  );

  const mySection = (
    <dl className="grid gap-x-4 gap-y-6 sm:grid-cols-2 mt-4">
      <KycDetailRow label={t("details.name")} value={t("details.you")} />
      {user && (
        <KycDetailRow label={t("details.email")} value={user.email} dir="ltr" />
      )}
    </dl>
  );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>{t("details.title")}</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-6 overflow-y-auto px-4 pb-6 pt-4">
          <div className="flex flex-col items-center gap-2 rounded-xl bg-muted/50 p-6 text-center">
            <span className="text-sm text-muted-foreground">
              {t("details.amount")}
            </span>
            <bdi
              dir="ltr"
              className={cn(
                "text-3xl font-semibold tabular-nums",
                isCredit
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-destructive",
              )}
            >
              {`${isCredit ? "+" : "−"}${formatMoney(transaction.amount, language)}`}
            </bdi>
            <Badge variant="outline" className="mt-2">
              {t(`types.${transaction.type}`)}
            </Badge>
          </div>

          <dl className="grid gap-x-4 gap-y-6 sm:grid-cols-2">
            <KycDetailRow
              label={t("details.date")}
              value={formatDateTime(transaction.createdAt, language)}
            />
            <KycDetailRow
              label={t("details.reference")}
              value={transaction.reference}
              dir="ltr"
            />
          </dl>

          <div className="h-px bg-border" />

          {/* SENDER SECTION */}
          <section>
            <h3 className="text-sm font-semibold text-muted-foreground">
              {t("details.sender")}
            </h3>
            {isCredit ? counterpartySection : mySection}
          </section>

          <div className="h-px bg-border" />

          {/* RECEIVER SECTION */}
          <section>
            <h3 className="text-sm font-semibold text-muted-foreground">
              {t("details.receiver")}
            </h3>
            {isCredit ? mySection : counterpartySection}
          </section>

          {transaction.description && (
            <>
              <div className="h-px bg-border" />
              <div className="flex flex-col gap-0.5">
                <h3 className="text-sm font-semibold text-muted-foreground">
                  {t("details.note")}
                </h3>
                <p className="text-sm font-medium mt-2">
                  <bdi dir="auto">{transaction.description}</bdi>
                </p>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

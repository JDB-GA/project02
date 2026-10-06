import { HandCoinsIcon, CheckIcon, XIcon, BanIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatDateTime } from "@/features/kyc/utils/format-kyc-date";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import { useLanguage } from "@/hooks/useLanguage";
import { cn } from "@/lib/utils";
import { usePaymentRequestActions } from "../hooks/usePaymentRequestActions";
import type { PaymentRequest } from "../types/payment-request.types";
import { formatMoney } from "../utils/format-money";

interface PaymentRequestRowProps {
  request: PaymentRequest;
}

export function PaymentRequestRow({ request }: PaymentRequestRowProps) {
  const { t } = useTranslation("wallet");
  const { language } = useLanguage();
  const { data: user } = useCurrentUser();
  const { pay, decline, cancel } = usePaymentRequestActions();

  if (!user) return null;

  const isIncoming = request.payerId === user.id;
  const isOutgoing = request.requesterId === user.id;
  const isPending = request.status === "PENDING";
  const isActionLoading =
    pay.isPending || decline.isPending || cancel.isPending;

  const badgeVariants: Record<string, string> = {
    PENDING: "secondary",
    PAID: "default",
    DECLINED: "destructive",
    CANCELLED: "outline",
  };

  return (
    <TableRow>
      <TableCell className="whitespace-nowrap">
        {formatDateTime(request.createdAt, language)}
      </TableCell>
      <TableCell>
        <div className="flex items-start gap-3">
          <div
            className={cn(
              "mt-0.5 rounded-full p-1 shrink-0",
              isIncoming
                ? "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400"
                : "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400",
            )}
          >
            <HandCoinsIcon className="size-3" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-medium text-muted-foreground">
              {isIncoming ? t("requests.requestFrom") : t("requests.requestTo")}
            </span>
            <span className="font-medium truncate">
              {isIncoming
                ? request.requester.maskedName
                : request.payer.maskedName}
            </span>
            {request.note && (
              <bdi
                dir="auto"
                className="max-w-xs truncate text-xs text-muted-foreground mt-0.5"
                title={request.note}
              >
                {request.note}
              </bdi>
            )}
          </div>
        </div>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <Badge
          variant={
            badgeVariants[request.status] as
              | "default"
              | "secondary"
              | "destructive"
              | "outline"
          }
        >
          {t(`requests.status.${request.status}`)}
        </Badge>
      </TableCell>
      <TableCell className="text-end">
        <bdi dir="ltr" className="font-medium tabular-nums text-foreground">
          {formatMoney(request.amount, language)}
        </bdi>
      </TableCell>
      <TableCell className="text-end">
        <div className="flex justify-end gap-2">
          {isPending && isIncoming && (
            <>
              <Button
                size="xs"
                variant="destructive"
                disabled={isActionLoading}
                onClick={() => decline.mutate(request.id)}
              >
                <XIcon data-icon="inline-start" />
                {t("requests.decline")}
              </Button>
              <Button
                size="xs"
                disabled={isActionLoading}
                onClick={() => pay.mutate(request.id)}
              >
                <CheckIcon data-icon="inline-start" />
                {t("requests.pay")}
              </Button>
            </>
          )}
          {isPending && isOutgoing && (
            <Button
              size="xs"
              variant="outline"
              disabled={isActionLoading}
              onClick={() => cancel.mutate(request.id)}
            >
              <BanIcon data-icon="inline-start" />
              {t("requests.cancel")}
            </Button>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
}

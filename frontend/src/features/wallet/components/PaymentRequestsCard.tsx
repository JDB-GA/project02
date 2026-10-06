import { useState } from "react";

import { LoadErrorAlert } from "@/components/LoadErrorAlert";
import { PaginationControls } from "@/components/PaginationControls";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { usePaymentRequests } from "../hooks/usePaymentRequests";
import { PaymentRequestsTable } from "./PaymentRequestsTable";

export function PaymentRequestsCard() {
  const [page, setPage] = useState(0);

  const { data, isPending, isError, isPlaceholderData, refetch } =
    usePaymentRequests(page);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h2>Payment requests</h2>
        </CardTitle>
      </CardHeader>

      <CardContent>
        {isPending ? (
          <Skeleton className="h-48 w-full rounded-xl" />
        ) : isError ? (
          <LoadErrorAlert
            message="Unable to load payment requests."
            onRetry={() => void refetch()}
          />
        ) : data ? (
          <div className="flex flex-col gap-4" aria-busy={isPlaceholderData}>
            <div className="overflow-x-auto">
              <PaymentRequestsTable requests={data.content} />
            </div>

            {data.totalPages > 1 && (
              <PaginationControls
                page={data.page}
                totalPages={data.totalPages}
                disabled={isPlaceholderData}
                onPageChange={setPage}
              />
            )}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}

import { useTranslation } from 'react-i18next'
import { HandCoinsIcon } from 'lucide-react'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import type { PaymentRequest } from '../types/payment-request.types'
import { PaymentRequestRow } from './PaymentRequestRow'

interface PaymentRequestsTableProps {
  requests: readonly PaymentRequest[]
}

export function PaymentRequestsTable({ requests }: PaymentRequestsTableProps) {
  const { t } = useTranslation('wallet')

  if (requests.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 py-12 text-center">
        <HandCoinsIcon className="size-8 text-muted-foreground" aria-hidden="true" />
        <p className="font-medium">{t('requests.emptyTitle')}</p>
        <p className="text-sm text-muted-foreground">{t('requests.emptyDescription')}</p>
      </div>
    )
  }

  return (
    <Table className="stacked-table">
      <TableHeader>
        <TableRow>
          <TableHead>{t('transactions.date')}</TableHead>
          <TableHead>{t('transactions.counterparty')}</TableHead>
          <TableHead>{t('requests.statusLabel')}</TableHead>
          <TableHead className="text-end">{t('transactions.amount')}</TableHead>
          <TableHead className="text-end">
            <span className="sr-only">{t('transactions.actions')}</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {requests.map((request) => (
          <PaymentRequestRow key={request.id} request={request} />
        ))}
      </TableBody>
    </Table>
  )
}

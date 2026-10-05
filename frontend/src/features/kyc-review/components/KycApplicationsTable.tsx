import { useTranslation } from 'react-i18next'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import type { KycApplicationSummary } from '../types/kyc-review.types'
import { KycApplicationRow } from './KycApplicationRow'

interface KycApplicationsTableProps {
  applications: readonly KycApplicationSummary[]
}

export function KycApplicationsTable({ applications }: KycApplicationsTableProps) {
  const { t } = useTranslation('kycReview')

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{t('table.fullName')}</TableHead>
          <TableHead>{t('table.cprNumber')}</TableHead>
          <TableHead className="hidden xl:table-cell">{t('table.email')}</TableHead>
          <TableHead className="hidden md:table-cell">{t('table.submittedAt')}</TableHead>
          <TableHead>{t('table.status')}</TableHead>
          <TableHead className="text-end">
            <span className="sr-only">{t('table.actions')}</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {applications.map((application) => (
          <KycApplicationRow key={application.id} application={application} />
        ))}
      </TableBody>
    </Table>
  )
}

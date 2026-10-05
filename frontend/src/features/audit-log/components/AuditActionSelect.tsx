import { useTranslation } from 'react-i18next'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { AUDIT_ACTION_FILTERS } from '../constants/audit-log.constants'
import type { AuditActionFilter } from '../types/audit-log.types'

interface AuditActionSelectProps {
  value: AuditActionFilter
  onChange: (action: AuditActionFilter) => void
}

export function AuditActionSelect({ value, onChange }: AuditActionSelectProps) {
  const { t } = useTranslation('auditLog')

  return (
    <Select
      value={value}
      onValueChange={(next) => {
        const action = AUDIT_ACTION_FILTERS.find((filter) => filter === next)
        if (action) {
          onChange(action)
        }
      }}
    >
      <SelectTrigger aria-label={t('filters.action')} className="w-full sm:w-56">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {AUDIT_ACTION_FILTERS.map((action) => (
          <SelectItem key={action} value={action}>
            {t(`actions.${action}`)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

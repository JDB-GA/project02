import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'

interface PaginationControlsProps {
  page: number
  totalPages: number
  disabled?: boolean
  onPageChange: (page: number) => void
}

export function PaginationControls({ page, totalPages, disabled = false, onPageChange }: PaginationControlsProps) {
  const { t } = useTranslation()

  if (totalPages <= 1) {
    return null
  }

  return (
    <nav aria-label={t('pagination.label')} className="flex items-center justify-between gap-3">
      <Button
        variant="outline"
        size="sm"
        disabled={disabled || page === 0}
        onClick={() => {
          onPageChange(page - 1)
        }}
      >
        <ChevronLeftIcon data-icon="inline-start" className="rtl:rotate-180" aria-hidden="true" />
        {t('pagination.previous')}
      </Button>
      <span className="text-sm text-muted-foreground" aria-live="polite">
        {t('pagination.pageOf', { page: page + 1, total: totalPages })}
      </span>
      <Button
        variant="outline"
        size="sm"
        disabled={disabled || page >= totalPages - 1}
        onClick={() => {
          onPageChange(page + 1)
        }}
      >
        {t('pagination.next')}
        <ChevronRightIcon data-icon="inline-end" className="rtl:rotate-180" aria-hidden="true" />
      </Button>
    </nav>
  )
}

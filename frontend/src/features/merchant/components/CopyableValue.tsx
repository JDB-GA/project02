import { useTranslation } from 'react-i18next'
import { CopyButton } from '@/components/CopyButton'

interface CopyableValueProps {
  value: string
}

export function CopyableValue({ value }: CopyableValueProps) {
  const { t } = useTranslation('merchant')

  return (
    <div className="flex items-center gap-1 rounded-lg border bg-muted/50 py-1 ps-3 pe-1">
      <bdi dir="ltr" className="min-w-0 flex-1 font-mono text-sm break-all">
        {value}
      </bdi>
      <CopyButton value={value} label={t('copy.label')} successMessage={t('copy.copied')} failureMessage={t('copy.failed')} />
    </div>
  )
}

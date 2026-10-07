import { FlaskConicalIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { TopUpDialog } from './TopUpDialog'

export function SimulationPanel() {
  const { t } = useTranslation('wallet')

  return (
    <section className="flex flex-col gap-3 rounded-xl border border-dashed p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        <FlaskConicalIcon className="mt-0.5 size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
        <div className="flex flex-col gap-1">
          <h2 className="text-sm font-semibold">{t('simulation.title')}</h2>
          <p className="text-sm text-muted-foreground">{t('simulation.note')}</p>
        </div>
      </div>
      <TopUpDialog />
    </section>
  )
}

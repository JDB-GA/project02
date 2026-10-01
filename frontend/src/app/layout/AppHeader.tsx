import { useTranslation } from 'react-i18next'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { useCurrentPage } from '@/app/navigation/useCurrentPage'

export function AppHeader() {
  const { t } = useTranslation()
  const page = useCurrentPage()

  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ms-1" aria-label={t('nav.toggleSidebar')} />
      <Separator orientation="vertical" className="me-2 data-[orientation=vertical]:h-4" />
      {page && <span className="font-medium">{t(`areas.${page.id}.title`)}</span>}
      <div className="ms-auto">
        <LanguageSwitcher />
      </div>
    </header>
  )
}

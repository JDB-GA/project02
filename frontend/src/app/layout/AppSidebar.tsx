import { useTranslation } from 'react-i18next'
import { AppLogo } from '@/components/AppLogo'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar'
import { useLanguage } from '@/hooks/useLanguage'
import { SidebarNav } from './SidebarNav'
import { UserMenu } from './UserMenu'

export function AppSidebar() {
  const { t } = useTranslation()
  const { direction } = useLanguage()

  return (
    <Sidebar side={direction === 'rtl' ? 'right' : 'left'} collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-1.5 font-semibold">
          <AppLogo />
          <span className="truncate group-data-[collapsible=icon]:hidden">{t('appName')}</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarNav />
      </SidebarContent>
      <SidebarFooter>
        <UserMenu />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

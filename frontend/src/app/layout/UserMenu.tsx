import { ChevronsUpDownIcon, KeyRoundIcon, LogOutIcon, UserIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { ROUTES } from '@/config/routes'
import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser'
import { useLogoutHandler } from '@/features/auth/hooks/useLogoutHandler'

export function UserMenu() {
  const { t } = useTranslation()
  const { data: user } = useCurrentUser()
  const { handleLogout, isPending } = useLogoutHandler()

  if (!user) {
    return null
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg" aria-label={t('nav.account')}>
              <UserIcon />
              <div className="grid flex-1 text-start text-sm leading-tight">
                <span dir="ltr" className="truncate text-start font-medium">{user.email}</span>
                <span className="truncate text-xs text-muted-foreground">{t(`roles.${user.role}`)}</span>
              </div>
              <ChevronsUpDownIcon className="ms-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top" align="start" className="w-(--radix-dropdown-menu-trigger-width) min-w-56">
            <DropdownMenuLabel dir="ltr" className="truncate font-normal text-muted-foreground">{user.email}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to={ROUTES.changePassword}>
                <KeyRoundIcon />
                {t('home.changePassword')}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={handleLogout} disabled={isPending}>
              <LogOutIcon />
              {t('home.logout')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

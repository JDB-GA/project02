import { UserPlusIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import { PageTitle } from '@/components/PageTitle'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ROUTES } from '@/config/routes'
import { UsersFilters } from '../components/UsersFilters'
import { UsersList } from '../components/UsersList'
import { useUsersFilters } from '../hooks/useUsersFilters'

export function UsersPage() {
  const { t } = useTranslation(['common', 'users'])
  const { query, setSearch, setRole, setStatus, setPage } = useUsersFilters()

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-4">
      <PageTitle title={t('areas.users.title')} />
      <Card>
        <CardHeader className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-3">
            <CardTitle>
              <h1>{t('areas.users.heading')}</h1>
            </CardTitle>
            <Button asChild size="sm">
              <Link to={ROUTES.userCreate}>
                <UserPlusIcon data-icon="inline-start" aria-hidden="true" />
                {t('users:create.button')}
              </Link>
            </Button>
          </div>
          <UsersFilters query={query} onSearch={setSearch} onRoleChange={setRole} onStatusChange={setStatus} />
        </CardHeader>
        <CardContent>
          <UsersList query={query} onPageChange={setPage} />
        </CardContent>
      </Card>
    </div>
  )
}

import { useTranslation } from 'react-i18next'
import { PageTitle } from '@/components/PageTitle'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { UsersFilters } from '../components/UsersFilters'
import { UsersList } from '../components/UsersList'
import { useUsersFilters } from '../hooks/useUsersFilters'

export function UsersPage() {
  const { t } = useTranslation()
  const { query, setSearch, setRole, setStatus, setPage } = useUsersFilters()

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-4">
      <PageTitle title={t('areas.users.title')} />
      <Card>
        <CardHeader className="flex flex-col gap-4">
          <CardTitle>
            <h1>{t('areas.users.heading')}</h1>
          </CardTitle>
          <UsersFilters query={query} onSearch={setSearch} onRoleChange={setRole} onStatusChange={setStatus} />
        </CardHeader>
        <CardContent>
          <UsersList query={query} onPageChange={setPage} />
        </CardContent>
      </Card>
    </div>
  )
}

import type { Ref } from 'react'
import { useTranslation } from 'react-i18next'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { CreatableRole } from '../types/user-management.types'

interface RoleSelectProps {
  id: string
  name: string
  value: string
  roles: readonly CreatableRole[]
  ref: Ref<HTMLButtonElement>
  onChange: (value: string) => void
  onBlur: () => void
  'aria-invalid': boolean
  'aria-describedby': string | undefined
}

export function RoleSelect({ name, value, roles, onChange, onBlur, ...triggerProps }: RoleSelectProps) {
  const { t } = useTranslation(['users', 'common'])

  return (
    <Select name={name} value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full" onBlur={onBlur} {...triggerProps}>
        <SelectValue placeholder={t('users:create.rolePlaceholder')} />
      </SelectTrigger>
      <SelectContent>
        {roles.map((role) => (
          <SelectItem key={role} value={role}>
            {t(`common:roles.${role}`)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

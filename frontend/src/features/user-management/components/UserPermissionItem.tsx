import { useId } from 'react'
import { useTranslation } from 'react-i18next'
import { Checkbox } from '@/components/ui/checkbox'
import type { Permission } from '@/features/auth/types/user.types'

interface UserPermissionItemProps {
  permission: Permission
  checked: boolean
  disabled: boolean
  isGrantable: boolean
  onChange: (granted: boolean) => void
}

export function UserPermissionItem({ permission, checked, disabled, isGrantable, onChange }: UserPermissionItemProps) {
  const { t } = useTranslation('users')
  const id = useId()
  const descriptionId = `${id}-description`

  return (
    <li className="flex items-start gap-3 p-3">
      <Checkbox
        id={id}
        checked={checked}
        disabled={disabled}
        aria-describedby={descriptionId}
        onCheckedChange={(state) => {
          onChange(state === true)
        }}
      />
      <div className="flex flex-col gap-0.5">
        <label htmlFor={id} className="text-sm font-medium peer-disabled:opacity-70">
          {t(`permissions.${permission}.label`)}
        </label>
        <p id={descriptionId} className="text-xs text-muted-foreground">
          {isGrantable ? t(`permissions.${permission}.description`) : t('permissions.notGrantable')}
        </p>
      </div>
    </li>
  )
}

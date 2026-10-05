import type { Permission } from '@/features/auth/types/user.types'
import { ALL_PERMISSIONS } from '../constants/user-management.constants'
import { UserPermissionItem } from './UserPermissionItem'

interface PermissionCheckboxesProps {
  value: readonly Permission[]
  disabled: boolean
  onChange: (permissions: Permission[]) => void
}

export function PermissionCheckboxes({ value, disabled, onChange }: PermissionCheckboxesProps) {
  return (
    <ul className="flex flex-col divide-y rounded-lg border">
      {ALL_PERMISSIONS.map((permission) => (
        <UserPermissionItem
          key={permission}
          permission={permission}
          checked={value.includes(permission)}
          disabled={disabled}
          isGrantable
          onChange={(granted) => {
            onChange(granted ? [...value, permission] : value.filter((current) => current !== permission))
          }}
        />
      ))}
    </ul>
  )
}

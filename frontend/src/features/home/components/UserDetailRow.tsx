import type { Direction } from '@/i18n/i18n.types'

interface UserDetailRowProps {
  label: string
  value: string
  dir?: Direction
}

export function UserDetailRow({ label, value, dir }: UserDetailRowProps) {
  return (
    <>
      <dt className="text-muted-foreground">{label}</dt>
      <dd dir={dir} className="text-end">{value}</dd>
    </>
  )
}

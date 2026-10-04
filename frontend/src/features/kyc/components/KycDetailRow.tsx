import type { Direction } from '@/i18n/i18n.types'

interface KycDetailRowProps {
  label: string
  value: string
  dir?: Direction
}

export function KycDetailRow({ label, value, dir }: KycDetailRowProps) {
  return (
    <div className="flex flex-col gap-0.5">
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className="text-sm font-medium">
        <bdi dir={dir}>{value}</bdi>
      </dd>
    </div>
  )
}

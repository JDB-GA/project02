import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

interface StatisticCardProps {
  label: string
  icon: LucideIcon
  value: ReactNode | undefined
}

export function StatisticCard({ label, icon: Icon, value }: StatisticCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">
          <h2>{label}</h2>
        </CardTitle>
        <Icon className="size-4 text-muted-foreground" aria-hidden="true" />
      </CardHeader>
      <CardContent>
        {value === undefined ? <Skeleton className="h-8 w-20" /> : <p className="text-2xl font-bold tabular-nums">{value}</p>}
      </CardContent>
    </Card>
  )
}

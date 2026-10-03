import { cn } from '@/lib/utils'

interface AppLogoProps {
  className?: string
}

export function AppLogo({ className }: AppLogoProps) {
  return <img src="/logo.png" alt="" aria-hidden="true" className={cn('size-5 shrink-0 object-contain', className)} />
}

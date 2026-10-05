import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { AppLogo } from './AppLogo'

interface LogoLoaderProps {
  className?: string
}

export function LogoLoader({ className }: LogoLoaderProps) {
  const { t } = useTranslation()

  return (
    <div role="status" className={cn('relative flex size-20 items-center justify-center', className)}>
      <span
        aria-hidden="true"
        className="absolute inset-0 animate-spin rounded-full border-4 border-primary/15 border-t-primary motion-reduce:animate-none"
      />
      <AppLogo className="size-10 animate-pulse motion-reduce:animate-none" />
      <span className="sr-only">{t('loading')}</span>
    </div>
  )
}

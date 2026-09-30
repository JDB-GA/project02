import type { PropsWithChildren } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { DirectionProvider } from '@/components/ui/direction'
import { Toaster } from '@/components/ui/sonner'
import { useLanguage } from '@/hooks/useLanguage'
import { queryClient } from '@/lib/query/query-client'

export function AppProviders({ children }: PropsWithChildren) {
  const { direction } = useLanguage()

  return (
    <QueryClientProvider client={queryClient}>
      <DirectionProvider dir={direction}>
        {children}
        <Toaster position="top-center" dir={direction} richColors />
      </DirectionProvider>
    </QueryClientProvider>
  )
}

import type { PropsWithChildren } from 'react'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'

interface SubmitButtonProps extends PropsWithChildren {
  isPending: boolean
}

export function SubmitButton({ isPending, children }: SubmitButtonProps) {
  return (
    <Button type="submit" size="lg" className="w-full" disabled={isPending} aria-busy={isPending}>
      {isPending && <Spinner data-icon="inline-start" />}
      {children}
    </Button>
  )
}

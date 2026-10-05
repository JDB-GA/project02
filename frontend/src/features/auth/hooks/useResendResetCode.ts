import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { useCountdown } from '@/hooks/useCountdown'
import { getErrorKey } from '@/lib/api/get-error-key'
import { authApi } from '../api/auth.api'
import { RESEND_COOLDOWN_SECONDS } from '../constants/auth.constants'

export function useResendResetCode() {
  const { t } = useTranslation(['auth', 'errors'])
  const resend = useMutation({ mutationFn: authApi.forgotPassword })
  const { remaining, restart } = useCountdown(RESEND_COOLDOWN_SECONDS)

  const resendCode = (email: string) => {
    resend.mutate(
      { email },
      {
        onSuccess: () => {
          restart()
          toast.success(t('auth:forgot.sent'))
        },
        onError: (error) => toast.error(t(`errors:${getErrorKey(error)}`)),
      },
    )
  }

  return { resendCode, remainingSeconds: remaining, isPending: resend.isPending, canResend: remaining <= 0 && !resend.isPending }
}

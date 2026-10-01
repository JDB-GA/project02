import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { useCountdown } from '@/hooks/useCountdown'
import { RESEND_COOLDOWN_SECONDS } from '../constants/auth.constants'
import { getErrorKey } from '../utils/get-error-key'
import { useResendVerification } from './useResendVerification'

export function useResendCode() {
  const { t } = useTranslation('auth')
  const { t: tErrors } = useTranslation('errors')
  const resend = useResendVerification()
  const { remaining, restart } = useCountdown(RESEND_COOLDOWN_SECONDS)

  const resendCode = () => {
    resend.mutate(undefined, {
      onSuccess: () => {
        restart()
        toast.success(t('verify.resent'))
      },
      onError: (error) => {
        toast.error(tErrors(getErrorKey(error)))
      },
    })
  }

  return {
    resendCode,
    remainingSeconds: remaining,
    isPending: resend.isPending,
    canResend: remaining <= 0 && !resend.isPending,
  }
}

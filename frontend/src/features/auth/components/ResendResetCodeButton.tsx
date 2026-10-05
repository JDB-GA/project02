import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { useResendResetCode } from '../hooks/useResendResetCode'

interface ResendResetCodeButtonProps {
  getEmail: () => Promise<string | null>
}

export function ResendResetCodeButton({ getEmail }: ResendResetCodeButtonProps) {
  const { t } = useTranslation('auth')
  const { resendCode, remainingSeconds, isPending, canResend } = useResendResetCode()

  return (
    <Button
      type="button"
      variant="link"
      className="w-full"
      disabled={!canResend}
      aria-live="polite"
      onClick={() => {
        void getEmail().then((email) => {
          if (email) {
            resendCode(email)
          }
        })
      }}
    >
      {isPending && <Spinner data-icon="inline-start" />}
      {remainingSeconds > 0 ? t('verify.resendIn', { seconds: remainingSeconds }) : t('reset.resend')}
    </Button>
  )
}

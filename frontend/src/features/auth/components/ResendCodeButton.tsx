import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { useResendCode } from '../hooks/useResendCode'

export function ResendCodeButton() {
  const { t } = useTranslation('auth')
  const { resendCode, remainingSeconds, isPending, canResend } = useResendCode()

  return (
    <Button variant="link" className="w-full" onClick={resendCode} disabled={!canResend} aria-live="polite">
      {isPending && <Spinner data-icon="inline-start" />}
      {remainingSeconds > 0 ? t('verify.resendIn', { seconds: remainingSeconds }) : t('verify.resend')}
    </Button>
  )
}

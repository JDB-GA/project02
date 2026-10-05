import { CheckIcon, CopyIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard'
import { COPY_FEEDBACK_MS } from '../constants/wallet.constants'

interface IbanCopyButtonProps {
  iban: string
}

export function IbanCopyButton({ iban }: IbanCopyButtonProps) {
  const { t } = useTranslation('wallet')
  const { copied, copy } = useCopyToClipboard(COPY_FEEDBACK_MS)

  const handleCopy = async () => {
    const success = await copy(iban)
    if (success) {
      toast.success(t('balance.ibanCopied'))
    } else {
      toast.error(t('balance.copyFailed'))
    }
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label={t('balance.copyIban')}
      onClick={() => {
        void handleCopy()
      }}
    >
      {copied ? <CheckIcon aria-hidden="true" /> : <CopyIcon aria-hidden="true" />}
    </Button>
  )
}

import { useTranslation } from 'react-i18next'
import { CopyButton } from '@/components/CopyButton'

interface IbanCopyButtonProps {
  iban: string
}

export function IbanCopyButton({ iban }: IbanCopyButtonProps) {
  const { t } = useTranslation('wallet')

  return (
    <CopyButton
      value={iban}
      label={t('balance.copyIban')}
      successMessage={t('balance.ibanCopied')}
      failureMessage={t('balance.copyFailed')}
    />
  )
}

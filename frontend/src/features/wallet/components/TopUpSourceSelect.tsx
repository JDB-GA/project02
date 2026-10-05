import type { Ref } from 'react'
import { useTranslation } from 'react-i18next'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { TopUpSourceOption } from '../types/wallet.types'
import { formatIban } from '../utils/iban'

interface TopUpSourceSelectProps {
  id: string
  name: string
  value: string
  sources: readonly TopUpSourceOption[]
  ref: Ref<HTMLButtonElement>
  onChange: (value: string) => void
  onBlur: () => void
  'aria-invalid': boolean
  'aria-describedby': string | undefined
}

export function TopUpSourceSelect({ name, value, sources, onChange, onBlur, ...triggerProps }: TopUpSourceSelectProps) {
  const { t } = useTranslation('wallet')

  return (
    <Select name={name} value={value} onValueChange={onChange}>
      <SelectTrigger className="h-auto w-full py-2" onBlur={onBlur} {...triggerProps}>
        <SelectValue placeholder={t('topUp.sourcePlaceholder')} />
      </SelectTrigger>
      <SelectContent>
        {sources.map((source) => (
          <SelectItem key={source.id} value={source.id}>
            <span className="flex flex-col items-start text-start">
              <span className="font-medium">{`${source.holderName} · ${source.bankName}`}</span>
              <bdi dir="ltr" className="font-mono text-xs text-muted-foreground">
                {formatIban(source.iban)}
              </bdi>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

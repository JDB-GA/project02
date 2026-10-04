import type { Ref } from 'react'
import { useTranslation } from 'react-i18next'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useCountryOptions } from '../hooks/useCountryOptions'

interface NationalitySelectProps {
  id: string
  name: string
  value: string
  ref: Ref<HTMLButtonElement>
  onChange: (value: string) => void
  onBlur: () => void
  'aria-invalid': boolean
  'aria-describedby': string | undefined
}

export function NationalitySelect({ name, value, onChange, onBlur, ...triggerProps }: NationalitySelectProps) {
  const { t } = useTranslation('kyc')
  const countries = useCountryOptions()

  return (
    <Select name={name} value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full" onBlur={onBlur} {...triggerProps}>
        <SelectValue placeholder={t('fields.nationalityPlaceholder')} />
      </SelectTrigger>
      <SelectContent>
        {countries.map((country) => (
          <SelectItem key={country.code} value={country.code}>
            {country.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

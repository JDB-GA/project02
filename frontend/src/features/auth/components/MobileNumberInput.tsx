import type { ComponentProps } from 'react'
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from '@/components/ui/input-group'
import { MOBILE_COUNTRY_CODE, MOBILE_NUMBER_LENGTH } from '../constants/auth.constants'

type MobileNumberInputProps = Omit<ComponentProps<typeof InputGroupInput>, 'type' | 'inputMode' | 'maxLength'>

export function MobileNumberInput(props: MobileNumberInputProps) {
  return (
    <InputGroup dir="ltr">
      <InputGroupAddon>
        <InputGroupText>{MOBILE_COUNTRY_CODE}</InputGroupText>
      </InputGroupAddon>
      <InputGroupInput
        type="tel"
        inputMode="numeric"
        autoComplete="tel-national"
        maxLength={MOBILE_NUMBER_LENGTH}
        {...props}
      />
    </InputGroup>
  )
}

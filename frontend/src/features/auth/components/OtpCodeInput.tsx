import type { ComponentProps } from 'react'
import { REGEXP_ONLY_DIGITS } from 'input-otp'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { OTP_LENGTH } from '../constants/auth.constants'

type OtpCodeInputProps = Omit<ComponentProps<typeof InputOTP>, 'maxLength' | 'pattern' | 'render' | 'children'>

const SLOT_INDEXES = Array.from({ length: OTP_LENGTH }, (_, index) => index)

export function OtpCodeInput(props: OtpCodeInputProps) {
  return (
    <div dir="ltr" className="flex justify-center">
      <InputOTP maxLength={OTP_LENGTH} pattern={REGEXP_ONLY_DIGITS} inputMode="numeric" autoComplete="one-time-code" {...props}>
        <InputOTPGroup>
          {SLOT_INDEXES.map((index) => (
            <InputOTPSlot key={index} index={index} className="size-11 text-lg" />
          ))}
        </InputOTPGroup>
      </InputOTP>
    </div>
  )
}

import { z } from 'zod'
import { validationKey } from '@/i18n/keys'
import { AMOUNT_PATTERN, TOP_UP_MAX, TOP_UP_MIN, TOP_UP_SOURCES } from '../constants/wallet.constants'

export const topUpSourceSchema = z.enum(TOP_UP_SOURCES)

export const topUpSchema = z.object({
  source: z.string().pipe(z.enum(TOP_UP_SOURCES, validationKey('topUpSourceRequired'))),
  amount: z
    .string()
    .trim()
    .min(1, validationKey('amountRequired'))
    .regex(AMOUNT_PATTERN, validationKey('amountInvalid'))
    .transform(Number)
    .pipe(z.number().min(TOP_UP_MIN, validationKey('amountTooSmall')).max(TOP_UP_MAX, validationKey('amountTooLarge'))),
})

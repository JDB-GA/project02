import { z } from 'zod'
import { validationKey } from '@/i18n/keys'
import {
  AMOUNT_PATTERN,
  RECIPIENT_MAX_LENGTH,
  TRANSFER_MAX,
  TRANSFER_MIN,
  TRANSFER_NOTE_MAX_LENGTH,
} from '../constants/wallet.constants'

export const transferSchema = z.object({
  recipient: z
    .string()
    .trim()
    .min(1, validationKey('recipientRequired'))
    .max(RECIPIENT_MAX_LENGTH, validationKey('recipientRequired')),
  amount: z
    .string()
    .trim()
    .min(1, validationKey('amountRequired'))
    .regex(AMOUNT_PATTERN, validationKey('amountInvalid'))
    .transform(Number)
    .pipe(z.number().min(TRANSFER_MIN, validationKey('amountTooSmall')).max(TRANSFER_MAX, validationKey('amountTooLarge'))),
  note: z.string().trim().max(TRANSFER_NOTE_MAX_LENGTH, validationKey('noteTooLong')),
})

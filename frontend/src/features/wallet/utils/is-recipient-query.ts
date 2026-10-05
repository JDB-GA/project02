import { MOBILE_NUMBER_PATTERN } from '@/features/auth/constants/auth.constants'
import { EMAIL_MARKER, IBAN_MIN_LENGTH } from '../constants/wallet.constants'

export const isRecipientQuery = (value: string): boolean => {
  const query = value.trim()
  if (query.includes(EMAIL_MARKER)) {
    return query.indexOf(EMAIL_MARKER) > 0 && query.indexOf(EMAIL_MARKER) < query.length - 1
  }
  return MOBILE_NUMBER_PATTERN.test(query) || query.replace(/\s+/g, '').length >= IBAN_MIN_LENGTH
}

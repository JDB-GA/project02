import type { TransferFormInput } from '../types/transfer.types'
import { getApiFieldErrors } from './get-api-field-errors'

type TransferField = keyof TransferFormInput

const TRANSFER_FIELDS: readonly TransferField[] = ['recipient', 'amount', 'note']

export const TRANSFER_CODE_ERRORS = {
  RECIPIENT_NOT_FOUND: { field: 'recipient', key: 'recipientNotFound' },
  RECIPIENT_UNAVAILABLE: { field: 'recipient', key: 'recipientUnavailable' },
  SELF_TRANSFER_NOT_ALLOWED: { field: 'recipient', key: 'recipientSelf' },
  INSUFFICIENT_BALANCE: { field: 'amount', key: 'insufficientBalance' },
  DAILY_TRANSFER_LIMIT_EXCEEDED: { field: 'amount', key: 'amountOverDailySendLimit' },
} as const

export const getTransferFieldErrors = (error: unknown) =>
  getApiFieldErrors<TransferField>(error, TRANSFER_CODE_ERRORS, TRANSFER_FIELDS)

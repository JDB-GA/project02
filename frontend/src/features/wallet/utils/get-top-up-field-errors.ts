import type { TopUpFormInput } from '../types/wallet.types'
import { getApiFieldErrors } from './get-api-field-errors'

type TopUpField = keyof TopUpFormInput

const TOP_UP_FIELDS: readonly TopUpField[] = ['source', 'amount']

export const getTopUpFieldErrors = (error: unknown) =>
  getApiFieldErrors<TopUpField>(error, { DAILY_TOP_UP_LIMIT_EXCEEDED: { field: 'amount', key: 'amountOverDailyLimit' } }, TOP_UP_FIELDS)

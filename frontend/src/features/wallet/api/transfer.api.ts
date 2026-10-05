import { requestJson } from '@/lib/api/http-client'
import { WALLET_ENDPOINTS } from '../constants/wallet.constants'
import { recipientSchema, recipientSuggestionsSchema, transferOptionsSchema } from '../schemas/transfer-options.schema'
import { transactionSchema } from '../schemas/wallet.schema'
import type { Recipient, RecipientSuggestion, TransferFormValues, TransferOptions } from '../types/transfer.types'
import type { Transaction } from '../types/wallet.types'

export const transferApi = {
  options: (signal?: AbortSignal): Promise<TransferOptions> =>
    requestJson(WALLET_ENDPOINTS.transferOptions, transferOptionsSchema, { signal }),

  findRecipient: (query: string, signal?: AbortSignal): Promise<Recipient> =>
    requestJson(`${WALLET_ENDPOINTS.recipients}?${new URLSearchParams({ query }).toString()}`, recipientSchema, { signal }),

  suggestRecipients: (query: string, signal?: AbortSignal): Promise<RecipientSuggestion[]> =>
    requestJson(
      `${WALLET_ENDPOINTS.recipientSuggestions}?${new URLSearchParams({ query }).toString()}`,
      recipientSuggestionsSchema,
      { signal },
    ),

  send: (payload: TransferFormValues): Promise<Transaction> =>
    requestJson(WALLET_ENDPOINTS.transfers, transactionSchema, { method: 'POST', body: payload }),
}

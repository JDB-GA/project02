import type { z } from 'zod'
import type { recipientSchema, recipientSuggestionSchema, transferOptionsSchema } from '../schemas/transfer-options.schema'
import type { transferSchema } from '../schemas/transfer.schema'

export type TransferOptions = z.infer<typeof transferOptionsSchema>

export type Recipient = z.infer<typeof recipientSchema>

export type TransferFormInput = z.input<typeof transferSchema>

export type TransferFormValues = z.output<typeof transferSchema>

export type RecipientSuggestion = z.infer<typeof recipientSuggestionSchema>

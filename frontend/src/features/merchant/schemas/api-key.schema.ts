import { z } from 'zod'

export const apiKeySchema = z.object({
  id: z.uuid(),
  name: z.string(),
  keyPrefix: z.string(),
  active: z.boolean(),
  lastUsedAt: z.iso.datetime({ offset: true }).nullable(),
  createdAt: z.iso.datetime({ offset: true }),
})

export const apiKeyListSchema = z.array(apiKeySchema)

export const apiKeyCreatedSchema = z.object({
  key: apiKeySchema,
  secret: z.string(),
})

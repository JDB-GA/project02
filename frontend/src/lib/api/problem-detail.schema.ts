import { z } from 'zod'

export const problemDetailSchema = z.object({
  status: z.number().optional(),
  title: z.string().optional(),
  detail: z.string().optional(),
  code: z.string().optional(),
  errors: z.record(z.string(), z.string()).optional(),
})

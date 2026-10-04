import type { z } from 'zod'
import type { problemDetailSchema } from './problem-detail.schema'

export type ProblemDetail = z.infer<typeof problemDetailSchema>

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export interface RequestOptions {
  method?: HttpMethod
  body?: FormData | object
  signal?: AbortSignal
}

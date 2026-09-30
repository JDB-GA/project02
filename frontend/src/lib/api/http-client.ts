import type { z } from 'zod'
import { env } from '@/config/env'
import { ApiError } from './api-error'
import { CONTENT_TYPE_JSON } from './http.constants'
import type { ProblemDetail, RequestOptions } from './http.types'
import { problemDetailSchema } from './problem-detail.schema'

async function parseProblem(response: Response): Promise<ProblemDetail> {
  const payload: unknown = await response.json().catch(() => ({}))
  const result = problemDetailSchema.safeParse(payload)
  return result.success ? result.data : {}
}

async function send(path: string, { method = 'GET', body, signal }: RequestOptions): Promise<Response> {
  const headers: HeadersInit = body === undefined
    ? { Accept: CONTENT_TYPE_JSON }
    : { Accept: CONTENT_TYPE_JSON, 'Content-Type': CONTENT_TYPE_JSON }

  const response = await fetch(`${env.apiUrl}${path}`, {
    method,
    signal,
    headers,
    credentials: 'include',
    body: body === undefined ? undefined : JSON.stringify(body),
  })

  if (!response.ok) {
    throw new ApiError(response.status, await parseProblem(response))
  }
  return response
}

export async function requestJson<TSchema extends z.ZodType>(
  path: string,
  schema: TSchema,
  options: RequestOptions = {},
): Promise<z.infer<TSchema>> {
  const response = await send(path, options)
  const payload: unknown = await response.json()
  return schema.parse(payload)
}

export async function requestVoid(path: string, options: RequestOptions = {}): Promise<void> {
  await send(path, options)
}

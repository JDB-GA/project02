import type { ProblemDetail } from './http.types'

export class ApiError extends Error {
  readonly status: number
  readonly code: string | undefined
  readonly fieldErrors: Readonly<Record<string, string>>

  constructor(status: number, problem: ProblemDetail) {
    super(problem.detail ?? `Request failed with status ${status}`)
    this.name = 'ApiError'
    this.status = status
    this.code = problem.code
    this.fieldErrors = problem.errors ?? {}
  }
}

export const isApiError = (error: unknown): error is ApiError => error instanceof ApiError

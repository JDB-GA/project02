import { createHmac, timingSafeEqual } from 'node:crypto'
import { config } from './shop.ts'

export type CheckoutStatus = 'PENDING' | 'PAID' | 'CANCELLED' | 'EXPIRED' | 'REFUNDED'

export interface CheckoutSession {
  id: string
  orderReference: string
  amount: number
  description: string | null
  status: CheckoutStatus
  checkoutUrl: string
  expiresAt: string
}

export interface CallbackEvent {
  event: string
  sessionId: string
  orderReference: string
  status: CheckoutStatus
}

export interface Problem {
  status: number
  code: string
  detail: string
}

interface NewSession {
  orderReference: string
  amount: number
  description: string
  returnUrl: string
  expiresInMinutes?: number
}

export class GatewayError extends Error {
  readonly problem: Problem

  constructor(problem: Problem) {
    super(problem.detail)
    this.problem = problem
  }
}

export const SIGNATURE_HEADER = 'x-wallet-signature'

const SESSIONS_URL = `${config.apiUrl}/api/gateway/checkout-sessions`

const call = async (method: 'GET' | 'POST', path: string, body?: NewSession): Promise<CheckoutSession> => {
  const response = await fetch(`${SESSIONS_URL}${path}`, {
    method,
    headers: { 'X-API-Key': config.apiKey, 'Content-Type': 'application/json' },
    body: body && JSON.stringify(body),
  })
  if (response.ok) {
    return (await response.json()) as CheckoutSession
  }
  const problem = (await response.json().catch(() => ({}))) as Partial<Problem>
  throw new GatewayError({
    status: response.status,
    code: problem.code ?? (response.status === 401 ? 'UNAUTHORIZED' : 'UNKNOWN'),
    detail: problem.detail ?? 'The API key is missing, wrong or revoked.',
  })
}

export const gateway = {
  createSession: (session: NewSession) => call('POST', '', session),
  getSession: (sessionId: string) => call('GET', `/${encodeURIComponent(sessionId)}`),
  cancelSession: (sessionId: string) => call('POST', `/${encodeURIComponent(sessionId)}/cancel`),
  refundSession: (sessionId: string) => call('POST', `/${encodeURIComponent(sessionId)}/refund`),
}

export const isValidSignature = (secret: string, body: string, received: string | undefined): boolean => {
  if (!received) {
    return false
  }
  const expected = createHmac('sha256', secret).update(body).digest('hex')
  return expected.length === received.length && timingSafeEqual(Buffer.from(expected), Buffer.from(received))
}

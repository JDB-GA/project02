import type { ResetPasswordLocationState } from '../types/auth.types'

const isResetState = (state: unknown): state is ResetPasswordLocationState =>
  typeof state === 'object' && state !== null && 'email' in state && typeof state.email === 'string'

export const getResetEmail = (state: unknown): string => (isResetState(state) ? state.email : '')

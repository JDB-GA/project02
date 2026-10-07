import type { User } from '../types/user.types'

export const canUseWallet = (user: User): boolean => user.role === 'MERCHANT' || user.kycStatus === 'APPROVED'

import { generatePath } from 'react-router'
import { ROUTES } from '@/config/routes'

export const getUserTransactionsPath = (userId: string): string => generatePath(ROUTES.userTransactions, { userId })

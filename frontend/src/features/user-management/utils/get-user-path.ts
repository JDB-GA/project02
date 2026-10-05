import { generatePath } from 'react-router'
import { ROUTES } from '@/config/routes'

export const getUserPath = (userId: string): string => generatePath(ROUTES.user, { userId })

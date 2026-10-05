import { generatePath } from 'react-router'
import { ROUTES } from '@/config/routes'

export const getKycReviewPath = (applicationId: string): string => generatePath(ROUTES.kycReview, { applicationId })

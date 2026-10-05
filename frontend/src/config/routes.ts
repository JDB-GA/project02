export const ROUTES = {
  root: '/',
  login: '/login',
  register: '/register',
  verifyEmail: '/verify-email',
  wallet: '/wallet',
  verification: '/verification',
  merchant: '/merchant',
  admin: '/admin',
  kycReviews: '/admin/kyc',
  kycReview: '/admin/kyc/:applicationId',
  users: '/admin/users',
  user: '/admin/users/:userId',
} as const

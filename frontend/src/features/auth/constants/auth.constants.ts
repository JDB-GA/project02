export const AUTH_ENDPOINTS = {
  register: '/auth/users/register',
  login: '/auth/users/login',
  logout: '/auth/users/logout',
  me: '/auth/users/me',
  verifyEmail: '/auth/users/verify-email',
  resendVerification: '/auth/users/verify-email/resend',
} as const

export const AUTH_QUERY_KEYS = {
  currentUser: ['auth', 'current-user'],
} as const

export const EMAIL_MARKER = '@'
export const MOBILE_COUNTRY_CODE = '+973'
export const MOBILE_NUMBER_LENGTH = 8
export const MOBILE_NUMBER_PATTERN = /^\d{8}$/
export const EMAIL_MAX_LENGTH = 254
export const PASSWORD_MIN_LENGTH = 8
export const PASSWORD_MAX_LENGTH = 72
export const OTP_LENGTH = 6
export const OTP_PATTERN = /^\d{6}$/
export const RESEND_COOLDOWN_SECONDS = 60


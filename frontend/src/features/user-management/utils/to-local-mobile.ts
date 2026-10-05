import { MOBILE_COUNTRY_CODE } from '@/features/auth/constants/auth.constants'

export const toLocalMobile = (mobileNumber: string): string =>
  mobileNumber.startsWith(MOBILE_COUNTRY_CODE) ? mobileNumber.slice(MOBILE_COUNTRY_CODE.length) : mobileNumber

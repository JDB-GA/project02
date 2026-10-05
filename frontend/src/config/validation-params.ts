import {
  EMAIL_MAX_LENGTH,
  MOBILE_NUMBER_LENGTH,
  OTP_LENGTH,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from '@/features/auth/constants/auth.constants'
import {
  AREA_MAX_LENGTH,
  CPR_LENGTH,
  FULL_NAME_MAX_LENGTH,
  MAX_FILE_SIZE_MB,
  MINIMUM_AGE_YEARS,
} from '@/features/kyc/constants/kyc.constants'
import { REJECTION_REASON_MAX_LENGTH } from '@/features/kyc-review/constants/kyc-review.constants'
import { TOP_UP_MAX, TOP_UP_MIN } from '@/features/wallet/constants/wallet.constants'

export const VALIDATION_PARAMS = {
  mobileLength: MOBILE_NUMBER_LENGTH,
  emailMax: EMAIL_MAX_LENGTH,
  passwordMin: PASSWORD_MIN_LENGTH,
  passwordMax: PASSWORD_MAX_LENGTH,
  otpLength: OTP_LENGTH,
  fullNameMax: FULL_NAME_MAX_LENGTH,
  cprLength: CPR_LENGTH,
  areaMax: AREA_MAX_LENGTH,
  minimumAge: MINIMUM_AGE_YEARS,
  maxFileSizeMb: MAX_FILE_SIZE_MB,
  rejectionReasonMax: REJECTION_REASON_MAX_LENGTH,
  topUpMin: TOP_UP_MIN,
  topUpMax: TOP_UP_MAX,
} as const

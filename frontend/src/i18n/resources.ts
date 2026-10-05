import arAuth from './locales/ar/auth.json'
import arCommon from './locales/ar/common.json'
import arErrors from './locales/ar/errors.json'
import arKyc from './locales/ar/kyc.json'
import arKycReview from './locales/ar/kycReview.json'
import arUsers from './locales/ar/users.json'
import arValidation from './locales/ar/validation.json'
import enAuth from './locales/en/auth.json'
import enCommon from './locales/en/common.json'
import enErrors from './locales/en/errors.json'
import enKyc from './locales/en/kyc.json'
import enKycReview from './locales/en/kycReview.json'
import enUsers from './locales/en/users.json'
import enValidation from './locales/en/validation.json'

const en = {
  common: enCommon,
  auth: enAuth,
  validation: enValidation,
  errors: enErrors,
  kyc: enKyc,
  kycReview: enKycReview,
  users: enUsers,
}

const ar: typeof en = {
  common: arCommon,
  auth: arAuth,
  validation: arValidation,
  errors: arErrors,
  kyc: arKyc,
  kycReview: arKycReview,
  users: arUsers,
}

export const resources = { en, ar }

export const NAMESPACES = ['common', 'auth', 'validation', 'errors', 'kyc', 'kycReview', 'users'] as const

export const DEFAULT_NAMESPACE = 'common'

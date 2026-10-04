import arAuth from './locales/ar/auth.json'
import arCommon from './locales/ar/common.json'
import arErrors from './locales/ar/errors.json'
import arKyc from './locales/ar/kyc.json'
import arValidation from './locales/ar/validation.json'
import enAuth from './locales/en/auth.json'
import enCommon from './locales/en/common.json'
import enErrors from './locales/en/errors.json'
import enKyc from './locales/en/kyc.json'
import enValidation from './locales/en/validation.json'

const en = {
  common: enCommon,
  auth: enAuth,
  validation: enValidation,
  errors: enErrors,
  kyc: enKyc,
}

const ar: typeof en = {
  common: arCommon,
  auth: arAuth,
  validation: arValidation,
  errors: arErrors,
  kyc: arKyc,
}

export const resources = { en, ar }

export const NAMESPACES = ['common', 'auth', 'validation', 'errors', 'kyc'] as const

export const DEFAULT_NAMESPACE = 'common'

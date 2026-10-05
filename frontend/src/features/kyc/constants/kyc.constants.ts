export const KYC_ENDPOINTS = {
  submit: '/api/kyc',
  mine: '/api/kyc/me',
  myDocument: (documentId: string) => `/api/kyc/me/documents/${encodeURIComponent(documentId)}`,
} as const

export const KYC_QUERY_KEYS = {
  mine: ['kyc', 'mine'],
  document: (documentId: string) => ['kyc', 'document', documentId],
} as const

export const FULL_NAME_MAX_LENGTH = 150
export const FULL_NAME_PATTERN = /^[\p{L} .'-]+$/u
export const CPR_LENGTH = 9
export const CPR_PATTERN = /^\d{9}$/
export const BLOCK_MAX_LENGTH = 4
export const ROAD_MAX_LENGTH = 5
export const BUILDING_MAX_LENGTH = 6
export const BLOCK_PATTERN = /^\d{1,4}$/
export const ROAD_PATTERN = /^\d{1,5}$/
export const BUILDING_PATTERN = /^[0-9A-Za-z]{1,6}$/
export const FLAT_PATTERN = /^[0-9A-Za-z]{0,6}$/
export const AREA_MAX_LENGTH = 100
export const MINIMUM_AGE_YEARS = 18
export const MAX_FILE_SIZE_MB = 5
export const MAX_FILE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024
export const IDENTITY_FILE_TYPES: readonly string[] = ['application/pdf']
export const PHOTO_FILE_TYPES: readonly string[] = ['image/jpeg', 'image/png']

export const DOCUMENT_FILE_EXTENSIONS: Readonly<Record<string, string>> = {
  'application/pdf': '.pdf',
  'image/jpeg': '.jpg',
  'image/png': '.png',
}

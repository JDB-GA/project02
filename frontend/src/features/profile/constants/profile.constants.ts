export const PROFILE_ENDPOINTS = {
  profile: '/api/profile',
  picture: '/api/profile/picture',
} as const

export const PROFILE_QUERY_KEYS = {
  profile: ['profile'],
  picture: ['profile', 'picture'],
} as const

export const DISPLAY_NAME_MIN_LENGTH = 2
export const DISPLAY_NAME_MAX_LENGTH = 70
export const DISPLAY_NAME_PATTERN = /^[\p{L}\p{N} .,&'-]+$/u
export const PICTURE_FIELD = 'file'
export const PICTURE_ACCEPT = 'image/jpeg,image/png'

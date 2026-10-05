import { isApiError } from '@/lib/api/api-error'
import { HTTP_STATUS } from '@/lib/api/http.constants'
import type { ErrorKey } from '@/i18n/i18n.types'
import { isErrorKey } from '@/i18n/keys'

export function getErrorKey(error: unknown): ErrorKey {
  if (error instanceof TypeError) {
    return 'network'
  }
  if (!isApiError(error)) {
    return 'unexpected'
  }
  if (error.code && isErrorKey(error.code)) {
    return error.code
  }
  return error.status >= HTTP_STATUS.internalServerError ? 'server' : 'unexpected'
}

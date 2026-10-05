import { isApiError } from '@/lib/api/api-error'
import { HTTP_STATUS } from '@/lib/api/http.constants'
import { requestJson, requestVoid } from '@/lib/api/http-client'
import { AUTH_ENDPOINTS } from '../constants/auth.constants'
import { userSchema } from '../schemas/user.schema'
import type {
  ChangePasswordPayload,
  ForgotPasswordPayload,
  LoginPayload,
  RegisterPayload,
  ResetPasswordPayload,
  VerifyEmailPayload,
} from '../types/auth.types'
import type { User } from '../types/user.types'

export const authApi = {
  login: (payload: LoginPayload): Promise<User> =>
    requestJson(AUTH_ENDPOINTS.login, userSchema, { method: 'POST', body: payload }),

  register: (payload: RegisterPayload): Promise<User> =>
    requestJson(AUTH_ENDPOINTS.register, userSchema, { method: 'POST', body: payload }),

  logout: (): Promise<void> => requestVoid(AUTH_ENDPOINTS.logout, { method: 'POST' }),

  verifyEmail: (payload: VerifyEmailPayload): Promise<User> =>
    requestJson(AUTH_ENDPOINTS.verifyEmail, userSchema, { method: 'POST', body: payload }),

  resendVerification: (): Promise<void> => requestVoid(AUTH_ENDPOINTS.resendVerification, { method: 'POST' }),

  forgotPassword: (payload: ForgotPasswordPayload): Promise<void> =>
    requestVoid(AUTH_ENDPOINTS.forgotPassword, { method: 'POST', body: payload }),

  resetPassword: (payload: ResetPasswordPayload): Promise<void> =>
    requestVoid(AUTH_ENDPOINTS.resetPassword, { method: 'POST', body: payload }),

  changePassword: (payload: ChangePasswordPayload): Promise<User> =>
    requestJson(AUTH_ENDPOINTS.changePassword, userSchema, { method: 'POST', body: payload }),

  getCurrentUser: async (signal?: AbortSignal): Promise<User | null> => {
    try {
      return await requestJson(AUTH_ENDPOINTS.me, userSchema, { signal })
    } catch (error) {
      if (isApiError(error) && error.status === HTTP_STATUS.unauthorized) {
        return null
      }
      throw error
    }
  },
}

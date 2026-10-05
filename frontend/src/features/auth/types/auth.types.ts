export interface LoginPayload {
  identifier: string
  password: string
}

export interface VerifyEmailPayload {
  code: string
}

export interface RegisterPayload {
  email: string
  mobileNumber: string
  password: string
}

export interface ForgotPasswordPayload {
  email: string
}

export interface ResetPasswordPayload {
  email: string
  code: string
  newPassword: string
}

export interface ChangePasswordPayload {
  currentPassword: string
  newPassword: string
}

export interface ResetPasswordLocationState {
  email: string
}

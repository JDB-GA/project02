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

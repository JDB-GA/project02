import type { RegisterPayload } from '../types/auth.types'
import type { RegisterFormValues } from '../types/auth-form.types'

export const toRegisterPayload = ({ email, mobileNumber, password }: RegisterFormValues): RegisterPayload => ({
  email,
  mobileNumber,
  password,
})

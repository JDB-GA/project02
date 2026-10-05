import type { z } from 'zod'
import type { changePasswordSchema } from '../schemas/change-password.schema'
import type { forgotPasswordSchema } from '../schemas/forgot-password.schema'
import type { loginSchema } from '../schemas/login.schema'
import type { registerSchema } from '../schemas/register.schema'
import type { resetPasswordSchema } from '../schemas/reset-password.schema'
import type { verifyEmailSchema } from '../schemas/verify-email.schema'

export type LoginFormValues = z.infer<typeof loginSchema>

export type RegisterFormValues = z.infer<typeof registerSchema>

export type VerifyEmailFormValues = z.infer<typeof verifyEmailSchema>

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>

export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>

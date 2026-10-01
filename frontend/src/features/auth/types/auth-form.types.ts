import type { z } from 'zod'
import type { loginSchema } from '../schemas/login.schema'
import type { registerSchema } from '../schemas/register.schema'
import type { verifyEmailSchema } from '../schemas/verify-email.schema'

export type LoginFormValues = z.infer<typeof loginSchema>

export type RegisterFormValues = z.infer<typeof registerSchema>

export type VerifyEmailFormValues = z.infer<typeof verifyEmailSchema>

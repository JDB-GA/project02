import type { z } from 'zod'
import type { businessNameSchema } from '../schemas/business-name.schema'
import type { profileSchema } from '../schemas/profile.schema'

export type Profile = z.infer<typeof profileSchema>

export type BusinessNameValues = z.infer<typeof businessNameSchema>

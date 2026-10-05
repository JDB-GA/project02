import { z } from 'zod'
import { permissionSchema } from '@/features/auth/schemas/user.schema'
import { validationKey } from '@/i18n/keys'
import { CREATABLE_ROLES } from '../constants/user-management.constants'
import { userContactSchema } from './user-contact.schema'

export const createUserSchema = userContactSchema.extend({
  role: z.string().pipe(z.enum(CREATABLE_ROLES, validationKey('roleRequired'))),
  permissions: z.array(permissionSchema),
})

import { z } from 'zod'
import { pageSchema } from '@/lib/api/page.schema'
import { AUDIT_ACTIONS, AUDIT_TARGET_TYPES } from '../constants/audit-log.constants'

export const auditActionSchema = z.enum(AUDIT_ACTIONS)

export const auditTargetTypeSchema = z.enum(AUDIT_TARGET_TYPES)

export const auditLogSchema = z.object({
  id: z.uuid(),
  actorEmail: z.email().nullable(),
  action: auditActionSchema,
  targetType: auditTargetTypeSchema,
  targetId: z.uuid().nullable(),
  details: z.string().nullable(),
  createdAt: z.iso.datetime({ offset: true }),
})

export const auditLogPageSchema = pageSchema(auditLogSchema)

import type { z } from 'zod'
import type { ALL_ACTIONS_FILTER } from '../constants/audit-log.constants'
import type { auditActionSchema, auditLogPageSchema, auditLogSchema, auditTargetTypeSchema } from '../schemas/audit-log.schema'

export type AuditAction = z.infer<typeof auditActionSchema>

export type AuditTargetType = z.infer<typeof auditTargetTypeSchema>

export type AuditActionFilter = AuditAction | typeof ALL_ACTIONS_FILTER

export type AuditLog = z.infer<typeof auditLogSchema>

export type AuditLogPage = z.infer<typeof auditLogPageSchema>

export interface AuditLogsQuery {
  action: AuditActionFilter
  page: number
}

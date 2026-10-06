import type { z } from 'zod'
import type { Permission, UserRole, UserStatus } from '@/features/auth/types/user.types'
import type { ALL_ACTIONS_FILTER } from '../constants/audit-log.constants'
import type { auditActionSchema, auditLogPageSchema, auditLogSchema } from '../schemas/audit-log.schema'

export type AuditActionFilter = z.infer<typeof auditActionSchema> | typeof ALL_ACTIONS_FILTER

export type AuditLog = z.infer<typeof auditLogSchema>

export type AuditLogPage = z.infer<typeof auditLogPageSchema>

export interface AuditLogsQuery {
  action: AuditActionFilter
  page: number
}

export type AuditDetails =
  | { kind: 'role'; role: UserRole }
  | { kind: 'permission'; permission: Permission }
  | { kind: 'statusChange'; from: UserStatus; to: UserStatus }
  | { kind: 'text'; text: string }

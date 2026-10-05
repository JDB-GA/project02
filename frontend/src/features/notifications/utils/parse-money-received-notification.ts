import { moneyReceivedNotificationSchema } from '../schemas/notification.schema'
import type { MoneyReceivedNotification } from '../types/notification.types'

export function parseMoneyReceivedNotification(data: unknown): MoneyReceivedNotification | null {
  if (typeof data !== 'string') {
    return null
  }

  try {
    const parsed: unknown = JSON.parse(data)
    const notification = moneyReceivedNotificationSchema.safeParse(parsed)
    return notification.success ? notification.data : null
  } catch {
    return null
  }
}

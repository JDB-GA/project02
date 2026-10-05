import type { z } from 'zod'
import type { moneyReceivedNotificationSchema } from '../schemas/notification.schema'

export type MoneyReceivedNotification = z.infer<typeof moneyReceivedNotificationSchema>

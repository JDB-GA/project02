import { z } from 'zod'

export const moneyReceivedNotificationSchema = z.object({
  amount: z.number().nonnegative(),
  senderName: z.string().trim().min(1),
  reference: z.string().trim().min(1),
})

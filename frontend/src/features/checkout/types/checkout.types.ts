import type { z } from 'zod'
import type { checkoutSchema } from '../schemas/checkout.schema'

export type Checkout = z.infer<typeof checkoutSchema>

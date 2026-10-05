import { requestVoid } from '@/lib/api/http-client'
import { ADMIN_ENDPOINTS } from '../constants/admin.constants'

export const adminApi = {
  cleanSeedData: (): Promise<void> => requestVoid(ADMIN_ENDPOINTS.seedData, { method: 'DELETE' }),
}

import { isApiError } from '@/lib/api/api-error'
import { HTTP_STATUS } from '@/lib/api/http.constants'
import { requestBlob, requestJson } from '@/lib/api/http-client'
import { KYC_ENDPOINTS } from '../constants/kyc.constants'
import { kycApplicationSchema } from '../schemas/kyc-application.schema'
import type { KycApplication } from '../types/kyc.types'

export const kycApi = {
  getMine: async (signal?: AbortSignal): Promise<KycApplication | null> => {
    try {
      return await requestJson(KYC_ENDPOINTS.mine, kycApplicationSchema, { signal })
    } catch (error) {
      if (isApiError(error) && error.status === HTTP_STATUS.notFound) {
        return null
      }
      throw error
    }
  },

  submit: (payload: FormData): Promise<KycApplication> =>
    requestJson(KYC_ENDPOINTS.submit, kycApplicationSchema, { method: 'POST', body: payload }),

  downloadDocument: (documentId: string): Promise<Blob> => requestBlob(KYC_ENDPOINTS.myDocument(documentId)),
}

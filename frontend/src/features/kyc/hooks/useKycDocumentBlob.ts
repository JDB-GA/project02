import { skipToken, useQuery } from '@tanstack/react-query'
import { kycApi } from '../api/kyc.api'
import { KYC_QUERY_KEYS } from '../constants/kyc.constants'

export function useKycDocumentBlob(documentId: string | null) {
  return useQuery({
    queryKey: KYC_QUERY_KEYS.document(documentId ?? ''),
    queryFn: documentId ? () => kycApi.downloadDocument(documentId) : skipToken,
    staleTime: Infinity,
  })
}

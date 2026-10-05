import { useSearchParams } from 'react-router'
import { KYC_REVIEW_SEARCH_PARAMS } from '../constants/kyc-review.constants'
import type { KycStatusFilter } from '../types/kyc-review.types'
import { parseKycReviewFilters } from '../utils/parse-kyc-review-filters'

export function useKycReviewFilters() {
  const [searchParams, setSearchParams] = useSearchParams()
  const filters = parseKycReviewFilters(searchParams)

  const setStatus = (status: KycStatusFilter) => {
    setSearchParams({ [KYC_REVIEW_SEARCH_PARAMS.status]: status })
  }

  const setPage = (page: number) => {
    setSearchParams({ [KYC_REVIEW_SEARCH_PARAMS.status]: filters.status, [KYC_REVIEW_SEARCH_PARAMS.page]: String(page) })
  }

  return { ...filters, setStatus, setPage }
}

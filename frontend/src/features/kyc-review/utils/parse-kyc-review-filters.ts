import { DEFAULT_KYC_STATUS_FILTER, KYC_REVIEW_SEARCH_PARAMS, KYC_STATUS_FILTERS } from '../constants/kyc-review.constants'
import type { KycApplicationsQuery, KycStatusFilter } from '../types/kyc-review.types'

const isStatusFilter = (value: string | null): value is KycStatusFilter =>
  KYC_STATUS_FILTERS.some((filter) => filter === value)

export function parseKycReviewFilters(params: URLSearchParams): KycApplicationsQuery {
  const status = params.get(KYC_REVIEW_SEARCH_PARAMS.status)
  const page = Number(params.get(KYC_REVIEW_SEARCH_PARAMS.page))

  return {
    status: isStatusFilter(status) ? status : DEFAULT_KYC_STATUS_FILTER,
    page: Number.isInteger(page) && page > 0 ? page : 0,
  }
}

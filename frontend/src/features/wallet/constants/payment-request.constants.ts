export const PAYMENT_REQUEST_ENDPOINTS = {
    list: '/api/wallet/requests',
    pay: (id: string) => `/api/wallet/requests/${encodeURIComponent(id)}/pay`,
    decline: (id: string) => `/api/wallet/requests/${encodeURIComponent(id)}/decline`,
    cancel: (id: string) => `/api/wallet/requests/${encodeURIComponent(id)}/cancel`,
} as const

export const PAYMENT_REQUEST_QUERY_KEYS = {
    all: ['payment-requests'],
    page: (page: number) => ['payment-requests', 'page', page],
} as const

export const PAYMENT_REQUEST_STATUSES = ['PENDING', 'PAID', 'DECLINED', 'CANCELLED'] as const

export const PAYMENT_REQUESTS_PAGE_SIZE = 10
import { ClipboardCheckIcon, LayoutDashboardIcon, ShieldCheckIcon, StoreIcon, WalletIcon } from 'lucide-react'
import { ROUTES } from '@/config/routes'
import type { AppPage } from './app-page.types'

export const APP_PAGES: readonly AppPage[] = [
  {
    id: 'wallet',
    path: ROUTES.wallet,
    icon: WalletIcon,
    roles: ['CLIENT'],
    showInSidebar: true,
    lazy: async () => ({ Component: (await import('@/features/wallet/pages/WalletPage')).WalletPage }),
  },
  {
    id: 'verification',
    path: ROUTES.verification,
    icon: ShieldCheckIcon,
    roles: ['CLIENT'],
    showInSidebar: true,
    lazy: async () => ({ Component: (await import('@/features/kyc/pages/VerificationPage')).VerificationPage }),
  },
  {
    id: 'merchant',
    path: ROUTES.merchant,
    icon: StoreIcon,
    roles: ['MERCHANT'],
    showInSidebar: true,
    lazy: async () => ({ Component: (await import('@/features/merchant/pages/MerchantPage')).MerchantPage }),
  },
  {
    id: 'admin',
    path: ROUTES.admin,
    icon: LayoutDashboardIcon,
    roles: ['ADMIN', 'SUPER_ADMIN'],
    showInSidebar: true,
    lazy: async () => ({ Component: (await import('@/features/admin/pages/AdminPage')).AdminPage }),
  },
  {
    id: 'kycReviews',
    path: ROUTES.kycReviews,
    icon: ClipboardCheckIcon,
    roles: ['ADMIN', 'SUPER_ADMIN'],
    permission: 'KYC_REVIEW',
    showInSidebar: true,
    lazy: async () => ({ Component: (await import('@/features/kyc-review/pages/KycReviewsPage')).KycReviewsPage }),
  },
  {
    id: 'kycReview',
    path: ROUTES.kycReview,
    icon: ClipboardCheckIcon,
    roles: ['ADMIN', 'SUPER_ADMIN'],
    permission: 'KYC_REVIEW',
    parentId: 'kycReviews',
    showInSidebar: false,
    lazy: async () => ({ Component: (await import('@/features/kyc-review/pages/KycReviewPage')).KycReviewPage }),
  },
]

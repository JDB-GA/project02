import { HandCoinsIcon, KeyRoundIcon, ReceiptTextIcon, ShieldCheckIcon, StoreIcon, WalletIcon } from 'lucide-react'
import { ROUTES } from '@/config/routes'
import type { AppPage } from './app-page.types'

export const WALLET_PAGES: readonly AppPage[] = [
  {
    id: 'wallet',
    path: ROUTES.wallet,
    icon: WalletIcon,
    roles: ['CLIENT'],
    showInSidebar: true,
    lazy: async () => ({ Component: (await import('@/features/wallet/pages/WalletPage')).WalletPage }),
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
    id: 'transactions',
    path: ROUTES.transactions,
    icon: ReceiptTextIcon,
    roles: ['CLIENT', 'MERCHANT'],
    showInSidebar: true,
    lazy: async () => ({ Component: (await import('@/features/wallet/pages/TransactionsPage')).TransactionsPage }),
  },
  {
    id: 'paymentRequests',
    path: ROUTES.paymentRequests,
    icon: HandCoinsIcon,
    roles: ['CLIENT', 'MERCHANT'],
    showInSidebar: true,
    lazy: async () => ({ Component: (await import('@/features/wallet/pages/PaymentRequestsPage')).PaymentRequestsPage }),
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
    id: 'changePassword',
    path: ROUTES.changePassword,
    icon: KeyRoundIcon,
    roles: ['CLIENT', 'MERCHANT', 'ADMIN', 'SUPER_ADMIN'],
    showInSidebar: false,
    lazy: async () => ({ Component: (await import('@/features/auth/pages/ChangePasswordPage')).ChangePasswordPage }),
  },
]

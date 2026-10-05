import { Navigate, createBrowserRouter } from 'react-router'
import { FullPageSpinner } from '@/components/FullPageSpinner'
import { ROUTES } from '@/config/routes'
import { AppLayout } from '@/app/layout/AppLayout'
import { APP_PAGES } from '@/app/navigation/app-pages'
import { AuthenticatedRoute } from './AuthenticatedRoute'
import { GuestRoute } from './GuestRoute'
import { RoleRoute } from './RoleRoute'
import { RootRedirect } from './RootRedirect'
import { VerificationRoute } from './VerificationRoute'

const fallback = <FullPageSpinner />

export const router = createBrowserRouter([
  { path: ROUTES.root, element: <RootRedirect /> },
  {
    element: <GuestRoute />,
    hydrateFallbackElement: fallback,
    children: [
      { path: ROUTES.login, lazy: async () => ({ Component: (await import('@/features/auth/pages/LoginPage')).LoginPage }) },
      { path: ROUTES.register, lazy: async () => ({ Component: (await import('@/features/auth/pages/RegisterPage')).RegisterPage }) },
      {
        path: ROUTES.forgotPassword,
        lazy: async () => ({ Component: (await import('@/features/auth/pages/ForgotPasswordPage')).ForgotPasswordPage }),
      },
      {
        path: ROUTES.resetPassword,
        lazy: async () => ({ Component: (await import('@/features/auth/pages/ResetPasswordPage')).ResetPasswordPage }),
      },
    ],
  },
  {
    element: <VerificationRoute />,
    hydrateFallbackElement: fallback,
    children: [
      { path: ROUTES.verifyEmail, lazy: async () => ({ Component: (await import('@/features/auth/pages/VerifyEmailPage')).VerifyEmailPage }) },
    ],
  },
  {
    element: <AuthenticatedRoute />,
    hydrateFallbackElement: fallback,
    children: [
      {
        element: <AppLayout />,
        children: APP_PAGES.map((page) => ({
          element: <RoleRoute roles={page.roles} permission={page.permission} />,
          children: [{ path: page.path, lazy: page.lazy }],
        })),
      },
    ],
  },
  { path: '*', element: <Navigate to={ROUTES.root} replace /> },
])

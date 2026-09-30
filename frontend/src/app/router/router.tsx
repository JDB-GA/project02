import { Navigate, createBrowserRouter } from 'react-router'
import { FullPageSpinner } from '@/components/FullPageSpinner'
import { ROUTES } from '@/config/routes'
import { GuestRoute } from './GuestRoute'
import { ProtectedRoute } from './ProtectedRoute'

export const router = createBrowserRouter([
  {
    element: <GuestRoute />,
    hydrateFallbackElement: <FullPageSpinner />,
    children: [
      {
        path: ROUTES.login,
        lazy: async () => ({ Component: (await import('@/features/auth/pages/LoginPage')).LoginPage }),
      },
      {
        path: ROUTES.register,
        lazy: async () => ({ Component: (await import('@/features/auth/pages/RegisterPage')).RegisterPage }),
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    hydrateFallbackElement: <FullPageSpinner />,
    children: [
      {
        path: ROUTES.home,
        lazy: async () => ({ Component: (await import('@/features/home/pages/HomePage')).HomePage }),
      },
    ],
  },
  { path: '*', element: <Navigate to={ROUTES.home} replace /> },
])

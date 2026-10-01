import { Navigate, createBrowserRouter } from "react-router";
import { FullPageSpinner } from "@/components/FullPageSpinner";
import { ROUTES } from "@/config/routes";
import { GuestRoute } from "./GuestRoute";
import { ProtectedRoute } from "./ProtectedRoute";
import { ADMIN_ROLES, CLIENT_ROLES, MERCHANT_ROLES } from "./role-routes";
import { RootRedirect } from "./RootRedirect";
import { VerificationRoute } from "./VerificationRoute";

const fallback = <FullPageSpinner />;

export const router = createBrowserRouter([
  { path: ROUTES.root, element: <RootRedirect /> },
  {
    element: <GuestRoute />,
    hydrateFallbackElement: fallback,
    children: [
      {
        path: ROUTES.login,
        lazy: async () => ({
          Component: (await import("@/features/auth/pages/LoginPage"))
            .LoginPage,
        }),
      },
      {
        path: ROUTES.register,
        lazy: async () => ({
          Component: (await import("@/features/auth/pages/RegisterPage"))
            .RegisterPage,
        }),
      },
    ],
  },
  {
    element: <VerificationRoute />,
    hydrateFallbackElement: fallback,
    children: [
      {
        path: ROUTES.verifyEmail,
        lazy: async () => ({
          Component: (await import("@/features/auth/pages/VerifyEmailPage"))
            .VerifyEmailPage,
        }),
      },
    ],
  },
  {
    element: <ProtectedRoute allowedRoles={CLIENT_ROLES} />,
    hydrateFallbackElement: fallback,
    children: [
      {
        path: ROUTES.wallet,
        lazy: async () => ({
          Component: (await import("@/features/wallet/pages/WalletPage"))
            .WalletPage,
        }),
      },
    ],
  },
  {
    element: <ProtectedRoute allowedRoles={MERCHANT_ROLES} />,
    hydrateFallbackElement: fallback,
    children: [
      {
        path: ROUTES.merchant,
        lazy: async () => ({
          Component: (await import("@/features/merchant/pages/MerchantPage"))
            .MerchantPage,
        }),
      },
    ],
  },
  {
    element: <ProtectedRoute allowedRoles={ADMIN_ROLES} />,
    hydrateFallbackElement: fallback,
    children: [
      {
        path: ROUTES.admin,
        lazy: async () => ({
          Component: (await import("@/features/admin/pages/AdminPage"))
            .AdminPage,
        }),
      },
    ],
  },
  { path: "*", element: <Navigate to={ROUTES.root} replace /> },
]);

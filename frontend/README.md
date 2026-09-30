# Digital Wallet — Frontend

React 19 + TypeScript + Vite, with shadcn/ui, Tailwind CSS v4, React Router, TanStack Query, react-hook-form + zod, and react-i18next (English / Arabic with RTL).

## Setup

```bash
pnpm install
cp .env.example .env
```

`VITE_API_URL` in `.env` must point to the backend (`http://localhost:8080` in dev).

## Scripts

| Command        | Description                         |
| -------------- | ----------------------------------- |
| `pnpm dev`     | Start the dev server on port 5173   |
| `pnpm build`   | Type-check and build for production |
| `pnpm preview` | Preview the production build        |
| `pnpm lint`    | Run ESLint                          |

## Linting

ESLint runs type-aware (`strictTypeChecked` + `stylisticTypeChecked`) with `eslint-plugin-react-x` and `eslint-plugin-react-dom`. Generated shadcn components in `src/components/ui` are excluded.

## Structure

```
src/
├── app/         providers, router, route guards
├── components/  shared components (ui/ is shadcn)
├── config/      env and route constants
├── features/    feature modules (api, components, hooks, schemas, types, utils)
├── hooks/       shared hooks
├── i18n/        i18next setup and en/ar translations
└── lib/         HTTP client and query client
```

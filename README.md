# Almotawaj Digital Wallet

A bilingual (English / Arabic) digital wallet for Bahrain. Clients register, verify their email and their identity (KYC); staff review identity documents and manage users through role- and permission-based access.

|            | URL                                                                                                                       |
| ---------- | ------------------------------------------------------------------------------------------------------------------------- |
| Web app    | https://wallet.almotawaj.com                                                                                              |
| API        | https://api.almotawaj.com                                                                                                 |
| Swagger UI | https://api.almotawaj.com/swagger-ui.html                                                                                 |
| ERD        | [dbdiagram.io](https://dbdiagram.io/d/Digital-Wallet-6aba3c4e0f25a52d012826f8) · source: [`docs/erd.dbml`](docs/erd.dbml) |
| Planning   | [`Planning.md`](Planning.md) · user stories: [`docs/user-stories.md`](docs/user-stories.md)                               |

Monorepo:

| Folder      | Stack                                                                                | Runs on               |
| ----------- | ------------------------------------------------------------------------------------ | --------------------- |
| `backend/`  | Java 17, Spring Boot 4, Spring Security, Spring Data JPA, PostgreSQL                 | http://localhost:8080 |
| `frontend/` | React 19, TypeScript, Vite, TanStack Query, React Hook Form, Zod, shadcn/ui, i18next | http://localhost:5173 |

## Features

- **Accounts** – registration, login by email or mobile, email verification with 6-digit codes, forgot/reset password, change password. Changing or resetting a password signs out every other device.
- **Identity verification (KYC)** – clients submit personal details, address, CPR and passport (PDF) and a photo; they can preview and download their own documents.
- **KYC review** – reviewers filter applications, preview documents and approve or reject with a reason. Clients are emailed the decision in English and Arabic.
- **User management** – search users, create users by invitation (they set their own password), edit contact details, suspend, reactivate and soft delete (close) accounts.
- **Permissions** – the super admin grants fine-grained permissions to admins with checkboxes.
- **Audit log** – every administrative and security action is stored and listed for the super admin.
- **Security** – BCrypt passwords, httpOnly `SameSite=Strict` JWT cookie, token revocation, HMAC-hashed one-time codes, rate limiting, strict CORS, CSP/HSTS and other security headers on both apps, file type checks by content.
- **Localisation** – the whole UI and every email are available in English and Arabic (RTL).

## Roles and permissions

| Role          | Can do                                                               |
| ------------- | -------------------------------------------------------------------- |
| `CLIENT`      | Register, verify email, submit and track KYC, manage their password  |
| `MERCHANT`    | Merchant area (payment features are planned)                         |
| `ADMIN`       | Only what their permissions allow                                    |
| `SUPER_ADMIN` | Everything, including granting permissions and reading the audit log |

| Permission    | Grantable to | Unlocks                                                        |
| ------------- | ------------ | -------------------------------------------------------------- |
| `KYC_REVIEW`  | `ADMIN`      | KYC review list, documents, approve/reject                     |
| `USER_MANAGE` | `ADMIN`      | User search, creation, contact edits, suspend/reactivate/close |

Admins with `USER_MANAGE` manage clients and merchants only; only the super admin manages admins. Nobody can manage their own account or a super admin from user management.

## Business rules

1. Unverified emails can only reach verification and account endpoints.
2. One-time codes expire after 10 minutes (invitations: 48 hours), allow 5 attempts and can be resent once every 60 seconds.
3. A client can have only one pending KYC application and cannot resubmit after approval.
4. A CPR number can belong to only one pending or approved application.
5. KYC applicants must be 18+ and both identity documents must be unexpired.
6. Identity documents must be real PDFs and photos real JPEG/PNG files (checked by content), 5 MB max each.
7. Only `PENDING` applications can be reviewed; rejections require a reason. Two reviewers cannot decide the same application at once (row lock).
8. User status transitions: `ACTIVE ⇄ SUSPENDED`, any non-closed status → `CLOSED`. Closed accounts are kept but can never sign in or be changed.
9. Suspending or closing a user, or changing/resetting a password, takes effect on the very next request.
10. Permissions are only grantable to the roles that may hold them; super admin permissions are fixed.
11. Forgot-password responses never reveal whether an email exists.

## Getting started

Prerequisites: Java 17+, PostgreSQL, Node.js 20+, pnpm (`npm install -g pnpm`).

### Backend

```bash
cd backend
createdb -U postgres digital-wallet
cp src/main/resources/application-dev.properties.example src/main/resources/application-dev.properties
```

Fill in `application-dev.properties` (it is gitignored – never commit it):

| Key                           | Value                                                         |
| ----------------------------- | ------------------------------------------------------------- |
| `spring.datasource.password`  | your PostgreSQL password                                      |
| `jwt-secret`                  | `openssl rand -hex 32`                                        |
| `otp-secret`                  | another `openssl rand -hex 32` (different from `jwt-secret`)  |
| `resend-api-key`, `mail-from` | your [Resend](https://resend.com) API key and verified sender |
| `cors-allowed-origins`        | `http://localhost:5173`                                       |
| `app-url`                     | `http://localhost:5173` (used in email links)                 |
| `storage-root`                | folder for uploaded files, default `uploads`                  |
| `seed-token`, `seed-password` | optional, see [Seeding](#seeding)                             |

```bash
./mvnw spring-boot:run
./mvnw test
```

Tests use the `test` profile with an in-memory H2 database, so they never touch your PostgreSQL data.

### Frontend

```bash
cd frontend
pnpm install
cp .env.example .env
pnpm dev
```

`VITE_API_URL` in `.env` must point to the backend (`http://localhost:8080`). Other scripts: `pnpm build`, `pnpm preview`, `pnpm lint` (type-aware `strictTypeChecked`; generated shadcn components in `src/components/ui` are excluded).

## Seeding

Seeding is a single protected request, so it works on an empty database with no admin account.

1. Generate a token: `openssl rand -hex 32`.
2. Set `SEED_TOKEN` to it and `SEED_PASSWORD` to the password the demo accounts should use (in dev: `seed-token` / `seed-password`).
3. Call it from Postman:

```http
POST /api/seed
Authorization: Bearer <SEED_TOKEN>
```

`201` means the demo data exists. Running it again changes nothing. Without `SEED_TOKEN` the endpoint returns `404`; a wrong token returns `403`.

| Email                           | Mobile   | Role          | Demo state                  |
| ------------------------------- | -------- | ------------- | --------------------------- |
| `admin@almotawaj.com`           | 30000001 | `SUPER_ADMIN` | –                           |
| `reviewer@almotawaj.com`        | 30000004 | `ADMIN`       | `KYC_REVIEW`, `USER_MANAGE` |
| `merchant@almotawaj.com`        | 30000003 | `MERCHANT`    | –                           |
| `client@almotawaj.com`          | 30000002 | `CLIENT`      | KYC pending                 |
| `verified.client@almotawaj.com` | 30000005 | `CLIENT`      | KYC approved                |
| `rejected.client@almotawaj.com` | 30000006 | `CLIENT`      | KYC rejected with a reason  |

All accounts use `SEED_PASSWORD` and have verified emails. Seeded KYC applications have no document files.

## API

Interactive documentation with request/response schemas, status codes and examples: **`/swagger-ui.html`**. To try protected endpoints, call `POST /auth/users/login` first; the browser keeps the session cookie.

Errors use [RFC 9457 Problem Details](https://www.rfc-editor.org/rfc/rfc9457) with a machine-readable `code`:

```json
{
  "detail": "This verification request has already been reviewed",
  "instance": "/api/admin/kyc/4021630a-51e9-447e-afd6-355d60ae9339/approve",
  "status": 422,
  "title": "Unprocessable Content",
  "code": "KYC_ALREADY_REVIEWED"
}
```

Lists accept `page`, `size` (max 100) and `sort` (e.g. `sort=createdAt,desc`) and return `content`, `page`, `size`, `totalElements`, `totalPages`.

| Method | Endpoint                                                | Functionality                    | Access        |
| ------ | ------------------------------------------------------- | -------------------------------- | ------------- |
| POST   | `/auth/users/register`                                  | Register a client account        | Public        |
| POST   | `/auth/users/login`                                     | Log in                           | Public        |
| POST   | `/auth/users/logout`                                    | Log out                          | Public        |
| GET    | `/auth/users/me`                                        | Get the current user             | Signed in     |
| POST   | `/auth/users/verify-email`                              | Verify email                     | Signed in     |
| POST   | `/auth/users/verify-email/resend`                       | Resend the verification code     | Signed in     |
| POST   | `/auth/users/password/forgot`                           | Request a password reset code    | Public        |
| POST   | `/auth/users/password/reset`                            | Reset the password               | Public        |
| POST   | `/auth/users/password/change`                           | Change the password              | Signed in     |
| POST   | `/api/kyc`                                              | Submit an application            | Client        |
| GET    | `/api/kyc/me`                                           | Get my latest application        | Client        |
| GET    | `/api/kyc/me/documents/{documentId}`                    | Download one of my documents     | Client        |
| GET    | `/api/admin/kyc`                                        | List applications                | `KYC_REVIEW`  |
| GET    | `/api/admin/kyc/{applicationId}`                        | Get an application               | `KYC_REVIEW`  |
| POST   | `/api/admin/kyc/{applicationId}/approve`                | Approve an application           | `KYC_REVIEW`  |
| GET    | `/api/admin/kyc/{applicationId}/documents/{documentId}` | Download an application document | `KYC_REVIEW`  |
| POST   | `/api/admin/kyc/{applicationId}/reject`                 | Reject an application            | `KYC_REVIEW`  |
| GET    | `/api/admin/users`                                      | Search users                     | `USER_MANAGE` |
| POST   | `/api/admin/users`                                      | Create a user                    | `USER_MANAGE` |
| GET    | `/api/admin/users/{userId}`                             | Get a user                       | `USER_MANAGE` |
| PATCH  | `/api/admin/users/{userId}`                             | Update contact details           | `USER_MANAGE` |
| DELETE | `/api/admin/users/{userId}`                             | Close a user (soft delete)       | `USER_MANAGE` |
| POST   | `/api/admin/users/{userId}/reactivate`                  | Reactivate a user                | `USER_MANAGE` |
| POST   | `/api/admin/users/{userId}/suspend`                     | Suspend a user                   | `USER_MANAGE` |
| PUT    | `/api/admin/users/{userId}/permissions/{permission}`    | Grant a permission               | Super admin   |
| DELETE | `/api/admin/users/{userId}/permissions/{permission}`    | Revoke a permission              | Super admin   |
| GET    | `/api/admin/audit-logs`                                 | List audit entries               | Super admin   |
| POST   | `/api/seed`                                             | Seed demo data                   | Seed token    |

"Signed in" endpoints work before email verification; every other non-public endpoint also requires a verified email.

## Architecture

```
backend/src/main/java/com/almotawaj/wallet
├── config/       security, CORS, rate limiting, OpenAPI, constants (paths, messages, docs)
├── controller/   REST controllers (thin – no business logic)
├── service/      business rules, policies, emails, file storage
├── repository/   Spring Data JPA repositories and specifications
├── model/        entities, enums, request/response DTOs
├── event/        domain events (e.g. KYC reviewed → email after commit)
├── exception/    domain exceptions and the global handler
└── util/

frontend/src
├── app/          providers, router, route guards, layout, navigation
├── components/   shared components (ui/ is shadcn)
├── config/       env and route constants
├── features/     auth, kyc, kyc-review, user-management (api, components, hooks, schemas, types, utils, pages)
├── hooks/        shared hooks
├── i18n/         i18next setup and en/ar translations
└── lib/          HTTP client, query client, file helpers
```

## Deployment

**Backend – Railway** (service root directory `/backend`, PostgreSQL plugin, custom domain `api.almotawaj.com`):

1. Attach a **Volume** mounted at `/data` (uploaded KYC files live in `/data/uploads`).
2. Set the variables below and deploy.

| Variable                       | Value                                                                                  |
| ------------------------------ | -------------------------------------------------------------------------------------- |
| `SPRING_PROFILES_ACTIVE`       | `prod`                                                                                 |
| `DB_URL`                       | `jdbc:postgresql://${{Postgres.PGHOST}}:${{Postgres.PGPORT}}/${{Postgres.PGDATABASE}}` |
| `DB_USERNAME` / `DB_PASSWORD`  | `${{Postgres.PGUSER}}` / `${{Postgres.PGPASSWORD}}`                                    |
| `JWT_SECRET` / `OTP_SECRET`    | two different `openssl rand -hex 32` values                                            |
| `JWT_EXPIRATION_MS`            | optional, default `86400000` (24 h)                                                    |
| `CORS_ALLOWED_ORIGINS`         | `https://wallet.almotawaj.com,https://www.wallet.almotawaj.com`                        |
| `RESEND_API_KEY` / `MAIL_FROM` | Resend key and verified sender                                                         |
| `MAIL_LOGO_URL`                | optional logo URL for emails                                                           |
| `APP_URL`                      | `https://wallet.almotawaj.com` (email links)                                           |
| `STORAGE_ROOT`                 | optional, default `/data/uploads`                                                      |
| `SEED_TOKEN` / `SEED_PASSWORD` | optional, enables `POST /api/seed`                                                     |
| `RAILPACK_JDK_VERSION`         | `17`                                                                                   |

Email is sent through Resend's HTTPS API because Railway blocks outbound SMTP on non-Pro plans.

**Frontend – Vercel** (root directory `frontend`, ignored build step: _only build production_, domain `wallet.almotawaj.com`): set `VITE_API_URL=https://api.almotawaj.com`. `frontend/vercel.json` provides the SPA rewrite and security headers (CSP, HSTS, frame, referrer and permissions policies). API and web app share `almotawaj.com`, so the `SameSite=Strict` cookie works across them.

## Project management

Development follows feature branches (`feature-auth`, `feature-layout`, `feature-identity-verify`, …) with short Title Case commits. The process, timeline and remaining work are in [`Planning.md`](Planning.md); user stories with acceptance criteria are in [`docs/user-stories.md`](docs/user-stories.md) and on the Trello board.

# Planning

How the Almotawaj Digital Wallet is planned, built and tracked. User stories live in [`docs/user-stories.md`](docs/user-stories.md) and progress on [Trello](https://trello.com/b/81cjvTR6/project-02-jdb).

## Process

Every feature is built as one vertical slice, backend first, on its own branch:

1. **Stories** – write the user stories with acceptance criteria and add the work to Trello.
2. **Schema** – update the ERD ([`docs/erd.dbml`](docs/erd.dbml)) for the feature only.
3. **Model and repository** – entities, enums and queries.
4. **Service and tests** – business rules in services, one unit test per rule.
5. **API** – DTOs with validation, thin controller, error codes, English/Arabic messages, Swagger docs.
6. **Verify** – exercise the endpoints end to end (Swagger or Postman), including failure cases.
7. **Frontend** – api → types/schemas → hooks → components → page, in English and Arabic.
8. **Browser check** – test the flow in both languages, then clean up test data.
9. **Commit and merge** – small Title Case commits, merge the branch into `master`.

### Definition of done

- Backend tests pass (`./mvnw test`), frontend type-checks, lints and builds.
- Every file is at most 120 lines; types, schemas, hooks, API calls and components live in separate files.
- All user-facing text exists in English and Arabic.
- Inputs validated on both frontend and backend; errors return Problem Details with a `code`.
- Swagger, README endpoint table and ERD reflect the change.

### Conventions

- Branches: `feature-<name>` (e.g. `feature-auth`, `feature-layout`, `feature-identity-verify`); `deploy-setup` for infrastructure.
- Commits: short Title Case messages describing the change (`Add KYC Review Repositories`).
- Trello lists: **To Do → In Progress → Done**.

## Timeline

| Date | Delivered |
| --- | --- |
| 2026-09-30 | Project setup, registration and JWT login, frontend auth base, rate limiting |
| 2026-10-01 | Email verification with one-time codes, role-based navigation, app layout and theme |
| 2026-10-02 | Secret handling: dev properties untracked, `.gitignore` hardened |
| 2026-10-03 | Deployment to Railway and Vercel on `almotawaj.com`, email via Resend API, security headers |
| 2026-10-04 | KYC submission (backend and client UI), file storage, permission model |
| 2026-10-05 | KYC review, permissions, user management, create user by invitation, forgot/reset/change password, document preview, seeding, Swagger docs, test profile, audit log API and screen; wallets with generated IBANs, simulated incoming transfers with daily limits, wallet-to-wallet transfers with recipient autocomplete, transaction search and filters |

## Requirement coverage

| # | Requirement | Status |
| --- | --- | --- |
| 1 | Five+ entities, relationships, ERD | Done – users, user_permissions, otp_challenges, kyc_applications, kyc_documents, audit_logs, wallets, wallet_transactions |
| 2 | Spring profiles (dev/test), no hard-coded secrets | Done – `dev`, `test` (H2), `prod` (environment variables) |
| 3–4 | REST CRUD, correct status codes | Done |
| 5–6 | Validation, global exception handling | Done |
| 7–9 | Spring Security, JWT, roles that change behaviour | Done – roles plus fine-grained permissions |
| 10 | Registration and email verification | Done |
| 11 | Forgot/reset and change password | Done |
| 12 | User profile with profile picture | Planned |
| 13 | File upload with validation | Done – KYC documents; profile picture planned |
| 14 | Soft delete | Done – `CLOSED` status |
| 15–16 | Booking workflow, statuses, double-booking prevention | Planned – payment gateway checkout sessions |
| 17 | Swagger / OpenAPI | Done |
| 18 | DTOs | Done |
| 19 | Seeding | Done – `POST /api/seed` with a seed token |
| 20 | Business rules in services | Done – see README |
| 21 | Real-time notifications (SSE) | Planned |
| 22 | Logging | Done |
| 23, 33, 34 | Filtering, pagination, sorting | Done |
| 25 | Timestamps and auditing | Done |
| 30 | Tests | Done – service, policy and security unit tests |
| 31 | Security considerations | Done |
| 32 | Email notifications | Done – verification, reset, invitation, KYC decision |
| 35 | Rate limiting | Done |
| 36 | Audit log | Done – API and super admin screen |
| 37–38 | User stories and planning | This file and [`docs/user-stories.md`](docs/user-stories.md) |
| 39 | README API reference | Done |

## Next

In order of priority:

1. **Real-time notifications** – Server-Sent Events: money received, KYC decisions, payments.
2. **Payment gateway** – merchant API keys and checkout sessions (`PENDING → PAID / CANCELLED / EXPIRED`, `PAID → REFUNDED`) with double-payment prevention and their own daily limit; covers the booking requirement.
3. **Request money** – ask another user for money; accepting it is a transfer from them (transfer limit applies).
4. **Profile picture** – upload, preview and replace.
5. **Final pass** – README, ERD, Swagger and tests updated; presentation.

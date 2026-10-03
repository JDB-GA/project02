# Digital Wallet

Monorepo with a Spring Boot API and a React frontend.

| Folder      | Stack                              | Runs on               |
| ----------- | ---------------------------------- | --------------------- |
| `backend/`  | Spring Boot 4, Java 17, PostgreSQL | http://localhost:8080 |
| `frontend/` | React 19, Vite, TypeScript, pnpm   | http://localhost:5173 |

## Prerequisites

- Java 17+
- PostgreSQL running locally (default: `localhost:5432`)
- Node.js 20+
- pnpm (`npm install -g pnpm`)

## Backend

All commands below run from `backend/`:

```bash
cd backend
```

### Setup

1. Create the database:

   ```bash
   createdb -U postgres digital-wallet
   ```

2. Copy the example config files and fill in your values:

   ```bash
   cp src/main/resources/application.properties.example src/main/resources/application.properties
   cp src/main/resources/application-dev.properties.example src/main/resources/application-dev.properties
   ```

   In `application-dev.properties`, set at least:
   - `spring.datasource.password` — your PostgreSQL password
   - `jwt-secret` — a random 256-bit hex string (`openssl rand -hex 32`)
   - `cors-allowed-origins` — the frontend URL (`http://localhost:5173` in dev)
   - `otp-secret` — a random 256-bit hex string, different from `jwt-secret` (`openssl rand -hex 32`)
   - `resend-api-key` and `mail-from` — your Resend API key and verified sender address

   These files are gitignored; never commit real credentials.

### Run

```bash
./mvnw spring-boot:run
```

### Test

```bash
./mvnw test
```

### Build a jar

```bash
./mvnw clean package
java -jar target/wallet-*.jar
```

### Production

`application-prod.properties` is committed. It reads every secret from environment variables, so no real values live in the file. Set these on the server:

| Variable                 | Example                                              |
| ------------------------ | ---------------------------------------------------- |
| `SPRING_PROFILES_ACTIVE` | `prod`                                               |
| `DB_URL`                 | `jdbc:postgresql://db-host:5432/digital-wallet`      |
| `DB_USERNAME`            | `wallet_app`                                         |
| `DB_PASSWORD`            | strong database password                             |
| `JWT_SECRET`             | output of `openssl rand -hex 32`, different from dev |
| `JWT_EXPIRATION_MS`      | optional, defaults to `86400000` (24h)               |
| `CORS_ALLOWED_ORIGINS`   | `https://wallet.example.com` (comma-separated list)  |
| `OTP_SECRET`             | output of `openssl rand -hex 32`, different from JWT |
| `RESEND_API_KEY`         | Resend API key (`re_...`)                            |
| `MAIL_FROM`              | `Digital Wallet <no-reply@yourdomain.com>`           |
| `MAIL_LOGO_URL`          | optional, defaults to `https://almotawaj.com/logo/logo.png` |
| `PORT`                   | optional, defaults to `8080`                         |

Then run the jar:

```bash
java -jar target/wallet-*.jar
```

## Frontend

All commands below run from `frontend/`:

```bash
cd frontend
```

### Setup

```bash
pnpm install
cp .env.example .env
```

`VITE_API_URL` in `.env` must point to the backend (`http://localhost:8080` in dev).

### Run

```bash
pnpm dev
```

### Build

```bash
pnpm build
pnpm preview
```

### Lint

```bash
pnpm lint
```

ESLint runs type-aware (`strictTypeChecked` + `stylisticTypeChecked`) with the React X and React DOM plugins. Generated shadcn components in `src/components/ui` are excluded.

### Structure

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

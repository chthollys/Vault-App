# 🎮 Vault App

Vault App is a monorepo powering a digital games marketplace with a modern Next.js storefront and a NestJS API. The frontend delivers streaming-ready pages, a polished shopping experience, and responsive UI components, while the backend handles authentication, catalog management, reviews, and sessions backed by PostgreSQL, Redis, and Prisma.

## Highlights

- Next.js 16 App Router storefront with React 19, Turbopack-powered dev server, Tailwind CSS 4, HeroUI/MUI components, TanStack Query, and Zod-validated forms.
- NestJS 11 REST API with Prisma ORM, PostgreSQL, Redis-backed session cookies, JWT auth, email flows, and OAuth providers (Google/GitHub) in progress.
- Shared `@repo/types` package containing Zod schemas and DTOs consumed by both services for end-to-end type safety.
- TurboRepo-managed pnpm workspace for coordinated builds, linting, formatting, and shared TypeScript config.
- Configurable S3-backed asset delivery and API proxying so the frontend can serve media from S3 while rewriting API calls to the Nest service.

## Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS 4, HeroUI, Material UI, Framer Motion, TanStack Query, React Hook Form, React Toastify.
- **Backend**: NestJS 11, Prisma, PostgreSQL, Redis (Upstash/local), Passport, JWT, Nodemailer.
- **Tooling & DX**: pnpm 10, TurboRepo, TypeScript 5.9, ESLint 9, Prettier 3, shared TypeScript configs, Docker (backend image).

## Repository Layout

```text
.
├── src/frontend/           # Next.js storefront (App Router, streaming UI, API rewrites)
├── src/backend/            # NestJS API, Prisma schema, Redis integration, Dockerfile
├── packages/types/         # Shared Zod schemas and DTOs consumed by both apps
├── packages/typescript-config/  # Shared base tsconfig files
├── pnpm-workspace.yaml     # pnpm workspace definition
└── turbo.json              # Turbo pipeline for dev/build/lint/format
```

## Getting Started

### Prerequisites

- Node.js 20+ (or 22+ to match the Docker image)
- pnpm 10 (`corepack enable` or `npm install -g pnpm`)
- PostgreSQL 15+ and Redis 7+ (local containers or hosted services)
- An S3-compatible bucket if you plan to serve uploaded assets

### 1. Install dependencies

```sh
pnpm install
```

### 2. Configure environment variables

Create `.env` files for each package (values shown here are placeholders—never commit real secrets):

```env
# src/backend/.env
PORT=8000
FRONTEND_URL=http://localhost:3000

DATABASE_URL="postgresql://postgres:postgres@localhost:5432/vault_app"
DIRECT_URL="postgresql://postgres:postgres@localhost:5432/vault_app"
REDIS_URL="redis://localhost:6379"

JWT_SECRET="replace-with-64-char-random"
SESSION_SECRET="replace-with-64-char-random"

GITHUB_ID="github-oauth-client-id"
GITHUB_SECRET="github-oauth-client-secret"
GOOGLE_ID="google-oauth-client-id"
GOOGLE_SECRET="google-oauth-client-secret"

EMAIL_SERVER_HOST="smtp.example.com"
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER="noreply@example.com"
EMAIL_SERVER_PASSWORD="replace-me"
EMAIL_FROM="Vault App <noreply@example.com>"

S3_BUCKET_NAME="vault-app-assets"
S3_REGION="us-east-1"
```

```env
# src/frontend/.env
NEXT_PUBLIC_NEST_API_URL=http://localhost:8000
NEXT_PUBLIC_APP_ORIGIN=http://localhost:3000

S3_BUCKET_NAME=vault-app-assets
S3_REGION=us-east-1
```

You can also keep per-environment overrides inside the `.env/` directory if you prefer to segregate secrets (e.g., `.env/backend/dev.env`). Ensure the variables above remain available to each package.

### 3. Prepare the database

```sh
# Apply migrations
pnpm --filter backend exec prisma migrate dev

# Optional: seed development data
pnpm --filter backend seed
```

### 4. Run the apps

```sh
# Run both frontend and backend watchers via Turbo
pnpm dev

# Or run packages individually
pnpm --filter backend dev
pnpm --filter frontend dev
```

The frontend is available on http://localhost:3000 and rewrites `/api/*` requests to the NestJS API running on http://localhost:8000.

## Useful Commands

- `pnpm lint` – Run ESLint across all workspaces.
- `pnpm format` – Format all packages with Prettier.
- `pnpm build` – Execute `turbo run build` to build every package.
- `pnpm --filter backend test` – Run backend unit tests with Jest.
- `pnpm --filter backend start:prod` – Start the compiled NestJS server.
- `pnpm --filter frontend build && pnpm --filter frontend start` – Build and serve the Next.js app in production mode.

## Docker

A multi-stage backend image is available at `src/backend/Dockerfile`. It prunes the monorepo with Turbo, installs only the backend dependencies, and starts the compiled NestJS server on port 8000:

```sh
docker build -t vault-backend -f src/backend/Dockerfile .
docker run --env-file src/backend/.env -p 8000:8000 vault-backend
```

Make sure the container has network access to PostgreSQL, Redis, and any third-party services you configure.

## License

Distributed under the GPL-3.0 License. See `LICENSE` for full terms.

# ================================
# 1. Builder Stage
# ================================
FROM node:20-alpine AS builder
WORKDIR /app

RUN corepack enable

# Copy monorepo root files
COPY pnpm-workspace.yaml pnpm-lock.yaml package.json turbo.json ./

# Copy backend and shared packages
COPY src/backend ./src/backend
COPY packages ./packages

WORKDIR /app/src/backend

# Install dependencies for build only
RUN pnpm install --filter backend...

# Optional: Prisma
RUN pnpm prisma generate || echo "No Prisma schema found"

# Build NestJS app
RUN pnpm run build

# ================================
# 2. Runner Stage (Clean & Prod)
# ================================
FROM node:20-alpine AS runner
WORKDIR /app

RUN corepack enable

ENV NODE_ENV=production
ENV PORT=8000

# Copy only package definitions
COPY src/backend/package.json ./
COPY src/backend/pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./

# Install production-only dependencies
RUN pnpm install --prod --filter backend...

# Copy build output
COPY --from=builder /app/src/backend/dist ./dist
COPY --from=builder /app/packages ./packages

# Expose and run
EXPOSE 8000
CMD ["node", "dist/src/main.js"]


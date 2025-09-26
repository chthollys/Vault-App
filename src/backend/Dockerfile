# ---- Builder stage ----
FROM node:22-alpine AS builder

# Set working directory
WORKDIR /app

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@10.15.1 --activate

# Copy only the root manifests first (better layer caching)
COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./

# Copy all workspaces needed (so pnpm can resolve repo@workspace:*)
COPY packages ./packages
COPY src ./src

# Move into backend workspace
WORKDIR /app/src/backend

# Install only backend dependencies (resolves through workspace)
RUN pnpm install --filter backend... --no-frozen-lockfile

# Build backend
RUN pnpm build


# ---- Runtime stage ----
FROM node:22-alpine AS runner
WORKDIR /app

# Copy runtime files
COPY --from=builder /app/src/backend/dist ./dist
COPY --from=builder /app/src/backend/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

EXPOSE 4000

# Run Prisma migrations, then start the server
CMD ["sh", "-c", "pnpm prisma migrate deploy && node dist/main.js"]


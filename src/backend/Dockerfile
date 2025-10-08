# ---------- Stage 1: Builder ----------
FROM node:20-alpine AS builder

WORKDIR /app

# Copy only package files first (for caching)
COPY package*.json ./
COPY pnpm-lock.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile

# Copy source code and build
COPY . .
RUN pnpm prisma generate --no-engine
RUN pnpm build

# ---------- Stage 2: Production ----------
FROM node:20-alpine AS production

WORKDIR /app

# Copy only built output and dependencies needed for runtime
COPY package*.json ./
COPY pnpm-lock.yaml ./
RUN corepack enable && pnpm install --prod --frozen-lockfile

# Copy built app from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Environment setup
ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", "dist/src/main.js"]
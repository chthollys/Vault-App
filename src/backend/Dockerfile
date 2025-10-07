# ---------------------------
# 1. Base Builder
# ---------------------------
FROM node:20-alpine AS builder
WORKDIR /app

# Install pnpm globally
RUN corepack enable

# Copy root configs
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json turbo.json ./

# Copy only backend and shared packages
COPY src/backend ./src/backend
COPY packages ./packages

# Move into backend
WORKDIR /app/src/backend

# Install dependencies (respecting pnpm workspace)
RUN pnpm install --filter backend...

# Build the NestJS app
RUN pnpm run build

# ---------------------------
# 2. Runtime Image
# ---------------------------
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy only the built dist and necessary files
COPY --from=builder /app/src/backend/dist ./dist
COPY --from=builder /app/src/backend/package.json ./
COPY --from=builder /app/src/backend/node_modules ./node_modules

# Expose your NestJS port
EXPOSE 8000

# Default start command
CMD ["node", "dist/src/main.js"]


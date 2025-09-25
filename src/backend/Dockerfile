# 1. Base image with Node
FROM node:22-alpine AS builder

# 2. Set working dir
WORKDIR /app

# 3. Install pnpm
RUN corepack enable && corepack prepare pnpm@10.15.1 --activate

# 4. Copy package.json + lockfile
COPY package.json pnpm-lock.yaml ./

# 5. Install dependencies (no frozen lockfile headaches)
RUN pnpm install --no-frozen-lockfile

# 6. Copy source code
COPY . .

# 7. Build backend
RUN pnpm build

# --- Runtime image ---
FROM node:22-alpine AS runner
WORKDIR /app

# Copy only necessary files from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json

# Prisma client (generated at build time)
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# Expose NestJS default port
EXPOSE 4000

# Run migrations + start
CMD ["sh", "-c", "pnpm prisma migrate deploy && node dist/main.js"]

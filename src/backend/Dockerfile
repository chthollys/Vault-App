# ================================
# 1. Builder Stage (Compile & Build)
# ================================
FROM node:20-alpine AS builder
WORKDIR /app

# Use Corepack to manage pnpm
RUN corepack enable

# Copy manifests and source code
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY src ./src
COPY packages ./packages

# Install all dependencies and build the backend
RUN pnpm install --filter backend...
RUN pnpm --filter backend run build


# ================================
# 2. Runner Stage (Clean & Prod)
# ================================
FROM node:20-alpine AS runner
WORKDIR /app

# Use Corepack to manage pnpm
RUN corepack enable

ENV NODE_ENV=production
ENV PORT=8000

# Copy only the necessary manifests to install prod dependencies
COPY pnpm-workspace.yaml ./
COPY packages/ ./packages/
COPY src/backend/package.json ./src/backend/

# Now install ONLY production dependencies
RUN pnpm install --prod --filter backend...

# Copy the compiled code from the 'builder' stage
COPY --from=builder /app/src/backend/dist ./dist

EXPOSE 8000
CMD ["pnpm", "--filter", "backend", "start"]
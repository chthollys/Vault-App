# ================================
# 2. Runner Stage (Clean & Prod)
# ================================
FROM node:20-alpine AS runner
WORKDIR /app

RUN corepack enable

ENV NODE_ENV=production
ENV PORT=8000

# Copy workspace files FIRST (so pnpm can resolve workspaces)
COPY pnpm-workspace.yaml ./
COPY packages ./packages
COPY src/backend/package.json ./
COPY src/backend/pnpm-lock.yaml ./

# Now install production dependencies
RUN pnpm install --prod --filter backend...

# Copy built output last
COPY --from=builder /app/src/backend/dist ./dist

EXPOSE 8000
CMD ["node", "dist/src/main.js"]


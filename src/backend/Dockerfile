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
COPY package.json ./
COPY src/backend/package.json ./src/backend/

# Now install ONLY production dependencies
RUN pnpm install --prod --filter backend...

# Copy the compiled code from the 'builder' stage
COPY --from=builder /app/src/backend/dist ./dist

EXPOSE 8000
CMD ["node", "dist/main.js"]
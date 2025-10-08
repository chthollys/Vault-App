FROM node:20-alpine AS builder
WORKDIR /app

RUN corepack enable

ENV NODE_ENV=production
ENV PORT=8000

COPY pnpm-workspace.yaml ./
COPY package.json ./
COPY src/backend/ ./src/backend/
COPY packages/ ./packages/

RUN pnpm install --prod --filter backend...
# If you need to build, add a build step here:
RUN pnpm run build --filter backend...

# The builder stage ends here

FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8000

COPY --from=builder /app/src/backend/dist ./dist

EXPOSE 8000
CMD ["node", "dist/main.js"]
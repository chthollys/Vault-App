FROM node:22-alpine3.21 AS base
RUN apk add --no-cache libc6-compat
ENV PNPM_HOME=/pnpm
ENV PATH=/pnpm:$PATH
WORKDIR /app
RUN corepack enable

FROM base AS builder
COPY . .
RUN pnpm dlx turbo@2.8.14 prune frontend --docker

FROM base AS installer
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY --from=builder /app/out/json/ ./
RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store \
    pnpm install --frozen-lockfile

COPY --from=builder /app/out/full/ ./

ARG NEST_API_URL
ARG NEXT_PUBLIC_NEST_API_URL
ARG NEXT_PUBLIC_API_PROXY_BASE
ARG NEXT_PUBLIC_APP_ORIGIN
ARG S3_BUCKET_NAME
ARG S3_REGION
ENV NEST_API_URL=$NEST_API_URL \
    NEXT_PUBLIC_NEST_API_URL=${NEXT_PUBLIC_NEST_API_URL} \
    NEXT_PUBLIC_API_PROXY_BASE=${NEXT_PUBLIC_API_PROXY_BASE} \
    NEXT_PUBLIC_APP_ORIGIN=${NEXT_PUBLIC_APP_ORIGIN} \
    S3_BUCKET_NAME=${S3_BUCKET_NAME} \
    S3_REGION=${S3_REGION}

# ... then run build
RUN pnpm build
RUN pnpm --filter frontend... build

FROM base AS runner
RUN apk add --no-cache libc6-compat
WORKDIR /app
ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME=0.0.0.0 \
    NEXT_TELEMETRY_DISABLED=1

COPY --chown=node:node --from=installer /app/src/frontend/.next/standalone ./
COPY --chown=node:node --from=installer /app/src/frontend/.next/static ./.next/static
COPY --chown=node:node --from=installer /app/src/frontend/.next/static ./src/frontend/.next/static
# COPY --chown=node:node --from=installer /app/src/frontend/assets ./assets
COPY --chown=node:node --from=installer /app/src/frontend/assets ./src/frontend/assets

USER node
EXPOSE 3000
CMD ["sh", "-c", "if [ -f server.js ]; then node server.js; else node src/frontend/server.js; fi"]

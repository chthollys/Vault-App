FROM node:22-alpine3.21 AS base
RUN apk add --no-cache libc6-compat
ENV PNPM_HOME=/pnpm
ENV PATH=/pnpm:$PATH
WORKDIR /app
RUN corepack enable

FROM base AS builder
COPY . .
RUN pnpm dlx turbo@2.8.14 prune backend --docker

FROM base AS installer
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY --from=builder /app/out/json/ ./
RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store \
    pnpm install --frozen-lockfile

COPY --from=builder /app/out/full/ ./

ARG PORT
ARG DATABASE_URL
ARG DIRECT_URL
ARG EMAIL_FROM
ARG EMAIL_SERVER_HOST
ARG EMAIL_SERVER_PASSWORD
ARG EMAIL_SERVER_PORT
ARG EMAIL_SERVER_USER

ENV NODE_ENV=production \
    PORT=${PORT} \
    DATABASE_URL=${DATABASE_URL} \
    DIRECT_URL=${DIRECT_URL:-${DATABASE_URL}} \
    EMAIL_FROM=${EMAIL_FROM} \
    EMAIL_SERVER_HOST=${EMAIL_SERVER_HOST} \
    EMAIL_SERVER_PORT=465 \
    EMAIL_SERVER_USER=${EMAIL_SERVER_USER} \
    EMAIL_SERVER_PASSWORD=${EMAIL_SERVER_PASSWORD}


RUN pnpm --filter backend exec prisma generate

RUN pnpm --filter backend... build
RUN pnpm --filter backend deploy --legacy --prod /prod/backend

FROM base AS runner
RUN apk add --no-cache libc6-compat
WORKDIR /app
ENV NODE_ENV=production \
    PORT=8000

COPY --chown=node:node --from=installer /prod/backend/ ./
USER node
EXPOSE 8000

CMD ["node", "dist/src/main.js"]

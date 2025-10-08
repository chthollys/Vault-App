FROM node:22-alpine AS builder

RUN npm install -g pnpm
RUN npm install -g turbo@2.5.6

COPY package.json pnpm-workspace.yaml turbo.json pnpm-lock.yaml /app/
COPY packages /app/
COPY src/backend /app/src/

RUN ls -alr /app
RUN ls -alr /app/src

WORKDIR /app

RUN pnpm install --frozen-lockfile

RUN turbo prune backend --docker

FROM node:22-alpine AS installer
WORKDIR /app

RUN npm install -g pnpm

COPY --from=builder /app/out/json/ .
RUN pnpm install --frozen-lockfile || pnpm install --no-frozen-lockfile

COPY --from=builder /app/out/full/ .
RUN pnpm turbo run build

EXPOSE 8000

FROM node:22-alpine AS runner
WORKDIR /app

COPY --from=installer /app ./

CMD ["node", "dist/src/main.js"]
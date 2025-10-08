FROM node:20-alpine AS builder
WORKDIR /app

RUN ls /app -al

RUN npm install -g pnpm
RUN npm install -g turbo@2.5.6

COPY src/backend/ ./app/src/backend
COPY packages/ ./app/packages

RUN turbo prune backend --docker

FROM builder AS installer
WORKDIR /app

COPY --from=builder /app/out/json/ .
RUN pnpm install --frozen-lockfile

COPY --from=builder /app/out/full/ .
RUN pnpm turbo run build

EXPOSE 8000

CMD ["node", "main.js"]
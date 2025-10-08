FROM node:20-alpine AS builder
WORKDIR /app

RUN npm install -g pnpm
RUN npm install -g turbo@^2.5.6
COPY . .

RUN turbo prune backend --docker

FROM builder as installer
WORKDIR /app

COPY --from=builder /app/out/json .
RUN pnpm install --frozen-lockfile

COPY --from=builder /app/out/full .
RUN pnpm turbo run build

EXPOSE 8000

CMD ["node", "main.js"]
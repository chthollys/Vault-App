# Build and setup dependency
FROM node:22-alpine AS builder
WORKDIR /app

RUN npm install -g pnpm
RUN npm install -g turbo@2.5.6

COPY . .

RUN turbo prune backend --docker

RUN ls -alr /app
RUN ls -alr /app/src
RUN ls -alr /app/out

# Install from builder
FROM node:22-alpine AS installer
WORKDIR /app

RUN npm install -g pnpm
RUN npm install -g turbo@2.5.6
RUN npm install -g tsc

COPY --from=builder /app/out/full/ .
RUN pnpm install --prod
RUN pnpm turbo run build


# Runner stage
FROM node:22-alpine AS runner
WORKDIR /app

COPY --from=installer /app ./
EXPOSE 8000

CMD ["node", "src/backend/dist/src/main.js"]
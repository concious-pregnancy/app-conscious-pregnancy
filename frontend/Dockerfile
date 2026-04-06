FROM oven/bun:1-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

COPY package.json bun.lock* ./

RUN bun install --frozen-lockfile

# Build stage — Bun for install + `next build`
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG ASSET_PREFIX
ENV ASSET_PREFIX=${ASSET_PREFIX}

ENV NEXT_TELEMETRY_DISABLED=1

RUN bun run build

RUN mkdir -p /app/public

# Static assets for S3 / CloudFront sync
FROM scratch AS export
COPY --from=builder /app/.next/static /assets/.next/static
COPY --from=builder /app/public /assets/public

# Runner — Node on Debian (not Bun) for parity with Sentry / OpenTelemetry-style server instrumentation.
FROM node:22-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone/ ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]

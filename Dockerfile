FROM oven/bun:1.2 AS frontend
WORKDIR /build/kafra-vite
COPY kafra-vite/package.json ./
RUN bun install --frozen-lockfile || bun install
COPY kafra-vite/ ./
RUN bun run build

FROM oven/bun:1.2
WORKDIR /app
RUN apt-get update \
  && apt-get install -y --no-install-recommends tar ca-certificates \
  && rm -rf /var/lib/apt/lists/*

COPY package.json ./
RUN bun install --frozen-lockfile || bun install

COPY src ./src
COPY tsconfig.json ./tsconfig.json
COPY --from=frontend /build/kafra-vite/dist ./kafra-vite/dist

ENV NODE_ENV=production
EXPOSE 3000
CMD ["bun", "run", "start"]

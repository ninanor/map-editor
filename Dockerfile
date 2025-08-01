FROM node:24-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app
COPY package.json pnpm-lock.yaml ./


FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
COPY src src/
COPY public public/
COPY vite.config.ts index.html tsconfig.app.json tsconfig.json tsconfig.node.json eslint.config.js ./
RUN pnpm run build

FROM base AS frontend
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
COPY src src/
COPY public public/
COPY vite.config.ts index.html tsconfig.app.json tsconfig.json tsconfig.node.json eslint.config.js ./
EXPOSE 5173
CMD ["pnpm", "run", "dev"]


FROM nginx:stable-alpine-slim

COPY nginx/default.conf.template /etc/nginx/templates/
COPY --from=build /app/dist /var/www/

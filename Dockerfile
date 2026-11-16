# syntax=docker/dockerfile:1

FROM node:24-alpine AS deps
WORKDIR /app
ENV HUSKY=0
COPY package.json package-lock.json ./
RUN npm ci

FROM deps AS build
ENV ASTRO_TELEMETRY_DISABLED=1
COPY . .
RUN npm run build && npm prune --omit=dev

FROM node:24-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=3003
COPY --from=build --chown=node:node /app/package.json ./
COPY --from=build --chown=node:node /app/node_modules ./node_modules
COPY --from=build --chown=node:node /app/dist ./dist
COPY --from=build --chown=node:node /app/private ./private
USER node
EXPOSE 3003
CMD ["node", "dist/server/entry.mjs"]

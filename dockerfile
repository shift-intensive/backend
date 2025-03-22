FROM node:22-alpine AS base
LABEL org.opencontainers.image.source https://github.com/shift-intensive/backend

FROM base AS builder

WORKDIR /app
COPY package*.json ./
COPY yarn.lock ./
RUN yarn --production --frozen-lockfile

COPY . .

RUN yarn prisma-deploy
RUN yarn build

FROM base AS runner

COPY --from=builder /app/node_modules node_modules
COPY --from=builder /app/dist dist
COPY --from=builder /app/prisma prisma
COPY --from=builder /app/src/static dist/static
COPY --from=builder /app/package.json package.json

CMD [ "yarn", "prod" ]
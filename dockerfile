FROM node:20-alpine AS base
LABEL org.opencontainers.image.source https://github.com/siberiacancode/scrum-poker-frontend

FROM base AS builder

WORKDIR /app
COPY package*.json ./
RUN yarn --production

COPY . .

RUN yarn build

FROM base AS runner

COPY --from=builder /app/dist dist
COPY --from=builder /app/package.json package.json

CMD [ "yarn", "prod" ]
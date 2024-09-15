
FROM node:14-alpine AS builder

ARG SERVICE_NAME

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY apps/${SERVICE_NAME} ./apps/${SERVICE_NAME}
COPY libs ./libs

RUN npm ci
RUN npm run build ${SERVICE_NAME}

FROM node:14-alpine

ARG SERVICE_NAME

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

CMD ["node", "dist/apps/${SERVICE_NAME}/main"]
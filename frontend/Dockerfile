FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Variables utiles au dev dans Docker (watcher)
ENV HOST=0.0.0.0 \
    NUXT_TELEMETRY_DISABLED=1 \
    CHOKIDAR_USEPOLLING=1


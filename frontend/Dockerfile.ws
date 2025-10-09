# Build (compile TS → JS)
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx tsc -p tsconfig.server.json

# Runtime (JS pur)
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3001
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/dist/server/socket.js ./server/socket.js
EXPOSE 3001
CMD ["node", "server/socket.js"]

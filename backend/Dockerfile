FROM node:alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:alpine

WORKDIR /server

COPY package*.json ./

RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD [ "curl localhost:8080" ]

EXPOSE 8080

CMD ["node", "dist/server.js"]

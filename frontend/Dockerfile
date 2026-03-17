FROM node:20-slim AS base

WORKDIR /app

COPY package*.json .

# ENV NODE_ENV=production

RUN --mount=type=cache,target=/root/.npm \
  npm ci --no-audit --no-fund

ARG VITE_BASE_URL

ENV VITE_BASE_URL=$VITE_BASE_URL

# RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=base /app/dist /usr/share/nginx/html/

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD [ "curl localhost:80" ]

CMD ["nginx", "-g", "daemon off;"]

# USER nginx

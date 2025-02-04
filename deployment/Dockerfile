FROM node:22-alpine AS builder

ARG NEXT_PUBLIC_BACKEND_URL="/"
ENV NEXT_PUBLIC_BACKEND_URL=${NEXT_PUBLIC_BACKEND_URL}

ARG NEXT_PUBLIC_SOCKET_URL="/"
ENV NEXT_PUBLIC_SOCKET_URL=${NEXT_PUBLIC_SOCKET_URL}

ARG NEXT_PUBLIC_API_SUNAT_TOKEN="-"
ENV NEXT_PUBLIC_API_SUNAT_TOKEN=${NEXT_PUBLIC_API_SUNAT_TOKEN}

ARG NEXT_PUBLIC_LINK_API_SUNAT="/"
ENV NEXT_PUBLIC_LINK_API_SUNAT=${NEXT_PUBLIC_LINK_API_SUNAT}

WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine

WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.mjs ./next.config.mjs

CMD ["npm", "run", "start"]

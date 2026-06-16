# Etapa 1: Dependencias
FROM node:22-alpine AS deps

WORKDIR /app

COPY package*.json ./

RUN npm ci --ignore-scripts

# Etapa 2: Build
FROM node:22-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# Etapa 3: Producción
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=builder /app/package*.json ./

# Instala solo dependencias necesarias para producción
RUN npm ci --omit=dev --ignore-scripts

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/next.config.ts ./

EXPOSE 3000

CMD ["npm", "start"]
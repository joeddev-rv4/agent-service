# ---- Build stage ----
FROM node:20-alpine AS builder
WORKDIR /

# Instalar dependencias (aprovecha cache)
COPY package*.json ./
RUN npm ci

# Copiar código y compilar
COPY . .
RUN npm run build

# ---- Runtime stage ----
FROM node:20-alpine AS runner
WORKDIR /
ENV NODE_ENV=production

# Sólo dependencias de producción
COPY package*.json ./
RUN npm ci --omit=dev

# Copiar artefactos compilados
COPY --from=builder /app/dist ./dist

# (Opcional) copia cualquier archivo necesario en runtime (public/, views/, etc.)
# COPY --from=builder /app/public ./public

EXPOSE 3000
# Si no tienes "start:prod" en package.json, usa directamente node dist/main.js:
CMD ["node", "dist/main.js"]

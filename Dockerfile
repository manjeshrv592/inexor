# -------- Build stage --------
FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm install --legacy-peer-deps

# Copy source and build
COPY . .
RUN npm run build

# -------- Production stage --------
FROM node:18-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

# Copy built app
COPY --from=builder /app ./

# Cloud Run expects the app to listen on PORT
EXPOSE 8080
CMD ["npm", "start"]

# 1️⃣ Builder stage
FROM node:20-alpine AS builder

# Install pnpm globally
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy only package files first (for caching)
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy all project files
COPY . .

# Build Next.js app
RUN pnpm build

# 2️⃣ Runner stage
FROM node:20-alpine AS runner

WORKDIR /app

# Install pnpm (runtime not strictly needed if node_modules copied)
RUN npm install -g pnpm

# Copy necessary files from builder
COPY --from=builder /app/package.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Expose port
EXPOSE 3000

# Production environment
ENV NODE_ENV=production

# Start app
CMD ["pnpm", "start"]

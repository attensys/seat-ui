# Use Node.js standard image for better ARM v8 compatibility
FROM node:20-slim AS base
WORKDIR /usr/src/app

# Install dependencies needed for Bun and building
RUN apt-get update && apt-get install -y \
    curl \
    bash \
    unzip \
    && rm -rf /var/lib/apt/lists/*

# Install Bun with platform-specific handling for ARM v8 compatibility
RUN ARCH=$(uname -m) && \
    if [ "$ARCH" = "aarch64" ] || [ "$ARCH" = "arm64" ]; then \
        # For ARM64/ARM v8, use the specific ARM64 binary
        curl -fsSL -o bun.zip "https://github.com/oven-sh/bun/releases/latest/download/bun-linux-aarch64.zip" && \
        unzip bun.zip && \
        mv bun-linux-aarch64/bun /usr/local/bin/bun && \
        chmod +x /usr/local/bin/bun && \
        rm -rf bun.zip bun-linux-aarch64; \
    else \
        # For x86_64, use the installer script
        curl -fsSL https://bun.sh/install | bash && \
        cp /root/.bun/bin/bun /usr/local/bin/bun && \
        chmod +x /usr/local/bin/bun; \
    fi

# Install dependencies into temp directory
# This will cache them and speed up future builds
FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lock /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

# Install with --production (exclude devDependencies)
RUN mkdir -p /temp/prod
COPY package.json bun.lock /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

# Copy node_modules from temp directory
# Then copy all (non-ignored) project files into the image
FROM base AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

# Build the application
ENV NODE_ENV=production
RUN bun run build

# Copy production dependencies and source code into final image
FROM nginx:stable AS release
COPY --from=prerelease /usr/src/app/dist /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

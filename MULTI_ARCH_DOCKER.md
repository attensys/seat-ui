# Multi-Architecture Docker Support

This document explains how to build, deploy, and use multi-architecture Docker images for both
x86_64 (Intel/AMD) and ARM64 (including Raspberry Pi 4) architectures.

## Current Setup

Our CI/CD pipeline automatically builds Docker images for multiple architectures:

- `linux/amd64` (Intel/AMD 64-bit)
- `linux/arm64` (ARM 64-bit, including Raspberry Pi 4)

## For Raspberry Pi 4 Users

If you're experiencing issues pulling the Docker image on a Raspberry Pi 4, try the following:

### Option 1: Explicitly specify the platform

```bash
docker pull --platform linux/arm64 attensys/seat-ui:latest
docker run --platform linux/arm64 -p 80:80 attensys/seat-ui:latest
```

### Option 2: Update Docker and enable experimental features

Make sure you're running a recent version of Docker that supports multi-arch images:

```bash
# Update Docker (on Raspberry Pi OS)
sudo apt update && sudo apt upgrade docker.io

# Enable experimental features (add to /etc/docker/daemon.json)
{
  "experimental": true
}

# Restart Docker
sudo systemctl restart docker
```

### Option 3: Use Docker Compose with platform specification

```yaml
version: '3.8'
services:
  seat-ui:
    image: attensys/seat-ui:latest
    platform: linux/arm64
    ports:
      - '80:80'
```

## Troubleshooting

### Check available architectures

Use our test script to verify multi-arch support:

```bash
./test-multiarch.sh attensys/seat-ui:latest
```

### Verify your system architecture

```bash
uname -m
# Should show: aarch64 (for ARM64/Raspberry Pi 4)
```

### Check Docker platform detection

```bash
docker version --format '{{.Server.Arch}}'
```

### Manual manifest inspection

```bash
docker manifest inspect attensys/seat-ui:latest
```

## Building Locally for Multiple Architectures

If you need to build the image locally for multiple architectures:

### Prerequisites

```bash
# Create a new builder instance
docker buildx create --name multiarch-builder --use
docker buildx inspect --bootstrap
```

### Build for multiple platforms

```bash
# Build for both AMD64 and ARM64
docker buildx build \
  --platform linux/amd64,linux/arm64 \
  --tag your-registry/seat-ui:latest \
  --push .

# Build for ARM64 only (Raspberry Pi)
docker buildx build \
  --platform linux/arm64 \
  --tag your-registry/seat-ui:arm64 \
  --push .
```

### Test locally before pushing

```bash
# Build and load for current platform
docker buildx build \
  --platform linux/arm64 \
  --load \
  --tag seat-ui:test .

# Run the test image
docker run --rm -p 80:80 seat-ui:test
```

## CI/CD Pipeline

Our GitHub Actions workflow automatically:

1. Sets up Docker Buildx
2. Builds for multiple platforms (`linux/amd64,linux/arm64`)
3. Pushes multi-arch manifest to Docker Hub
4. Caches layers for faster subsequent builds

The relevant section in `.github/workflows/ci-cd.yml`:

```yaml
- name: Set up Docker Buildx
  uses: docker/setup-buildx-action@v3

- name: Build and push Docker image
  uses: docker/build-push-action@v5
  with:
    context: .
    platforms: linux/amd64,linux/arm64
    push: true
    tags: ${{ steps.meta.outputs.tags }}
    cache-from: type=gha
    cache-to: type=gha,mode=max
```

## Known Issues and Solutions

### Issue: "no matching manifest for linux/arm/v8"

**Solution**: Use `linux/arm64` instead of `linux/arm/v8`. Raspberry Pi 4 uses ARM64 architecture.

### Issue: Docker pull fails without specific platform

**Solution**: Always specify `--platform linux/arm64` when pulling on ARM devices.

### Issue: Performance on ARM64

**Solution**: The Dockerfile is optimized for ARM64 with specific Bun binary downloads for better
performance.

## Performance Notes

- ARM64 builds may take longer than AMD64 builds
- The Dockerfile includes platform-specific optimizations for Bun installation
- Nginx serves static files efficiently on both architectures
- Consider using BuildKit cache for faster rebuilds

## Docker Hub Repository

The images are published to: `attensys/seat-ui`

Available tags:

- `latest` (multi-arch: amd64, arm64)
- `main` (multi-arch: amd64, arm64)
- `develop` (multi-arch: amd64, arm64)
- Version tags (e.g., `v1.0.0`) (multi-arch: amd64, arm64)

# Quick Fix for Raspberry Pi 4 Docker Issues

If you're getting the error `"no matching manifest for linux/arm/v8 in the manifest list entries"`
when trying to pull the Docker image on a Raspberry Pi 4, here's the solution:

## Immediate Solution

Instead of:

```bash
docker pull attensys/seat-ui:latest
```

Use:

```bash
docker pull --platform linux/arm64 attensys/seat-ui:latest
docker run --platform linux/arm64 -p 80:80 attensys/seat-ui:latest
```

## Why This Happens

- Raspberry Pi 4 uses ARM64 architecture (also called aarch64)
- Docker sometimes doesn't auto-detect the correct platform
- The `linux/arm/v8` identifier is not standard - `linux/arm64` is correct

## Docker Compose Solution

If using docker-compose, add the platform specification:

```yaml
services:
  seat-ui:
    image: attensys/seat-ui:latest
    platform: linux/arm64 # Add this line
    ports:
      - '80:80'
```

## Verify Your Setup

Run our test script to check multi-arch support:

```bash
curl -sSL https://raw.githubusercontent.com/attensys/seat-ui/main/test-multiarch.sh | bash
```

## Alternative: Update Docker

Make sure you're running a recent Docker version:

```bash
sudo apt update && sudo apt upgrade docker.io
sudo systemctl restart docker
```

The image already supports both x86_64 and ARM64 architectures - you just need to explicitly specify
the platform on ARM devices.

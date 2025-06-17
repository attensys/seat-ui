#!/bin/bash

# Test Multi-Architecture Docker Image Script
# This script helps diagnose and test multi-arch Docker images

echo "🔍 Multi-Architecture Docker Image Test"
echo "======================================"

IMAGE_NAME="${1:-attensys/seat-ui:latest}"

echo "Testing image: $IMAGE_NAME"
echo ""

# Check if Docker Buildx is available
echo "1. Checking Docker Buildx availability..."
if docker buildx version > /dev/null 2>&1; then
    echo "✅ Docker Buildx is available"
    docker buildx version
else
    echo "❌ Docker Buildx is not available"
    echo "Please install Docker Buildx for multi-arch support"
    exit 1
fi

echo ""

# Show available platforms
echo "2. Available build platforms:"
docker buildx ls

echo ""

# Inspect the image manifest
echo "3. Inspecting image manifest..."
if docker manifest inspect "$IMAGE_NAME" > /dev/null 2>&1; then
    echo "✅ Manifest found. Available architectures:"
    docker manifest inspect "$IMAGE_NAME" | jq -r '.manifests[] | select(.platform.architecture != "unknown") | "  - \(.platform.os)/\(.platform.architecture)"'
else
    echo "❌ Could not inspect manifest for $IMAGE_NAME"
fi

echo ""

# Test pulling for different architectures
echo "4. Testing platform-specific pulls..."

# Test AMD64
echo "   Testing linux/amd64..."
if docker pull --platform linux/amd64 "$IMAGE_NAME" > /dev/null 2>&1; then
    echo "   ✅ linux/amd64 pull successful"
else
    echo "   ❌ linux/amd64 pull failed"
fi

# Test ARM64
echo "   Testing linux/arm64..."
if docker pull --platform linux/arm64 "$IMAGE_NAME" > /dev/null 2>&1; then
    echo "   ✅ linux/arm64 pull successful"
else
    echo "   ❌ linux/arm64 pull failed"
fi

echo ""

# Show current platform info
echo "5. Current system information:"
echo "   Docker version: $(docker --version)"
echo "   Architecture: $(uname -m)"
echo "   OS: $(uname -s)"

echo ""

# Instructions for Raspberry Pi
echo "6. Instructions for Raspberry Pi 4:"
echo "   If you're running this on a Raspberry Pi 4, try:"
echo "   docker pull --platform linux/arm64 $IMAGE_NAME"
echo "   docker run --platform linux/arm64 -p 80:80 $IMAGE_NAME"

echo ""
echo "🎯 Multi-arch test completed!"

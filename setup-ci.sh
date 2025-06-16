#!/bin/bash

# Setup script for CI/CD pipeline
set -e

echo "🚀 Setting up CI/CD pipeline for Seat UI"
echo "============================================"

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo "❌ Error: Not in a git repository"
    exit 1
fi

# Check if GitHub Actions workflow exists
if [ ! -f ".github/workflows/ci-cd.yml" ]; then
    echo "❌ Error: CI/CD workflow file not found"
    exit 1
fi

echo "✅ GitHub Actions workflow found"

# Check if we have the required files
REQUIRED_FILES=(
    "Dockerfile"
    "nginx.conf"
    ".dockerignore"
    "package.json"
)

for file in "${REQUIRED_FILES[@]}"; do
    if [ ! -f "$file" ]; then
        echo "❌ Error: Required file $file not found"
        exit 1
    fi
done

echo "✅ All required files present"

# Test build process
echo "🔨 Testing build process..."

if ! bun run lint; then
    echo "❌ Error: Linting failed"
    exit 1
fi

echo "✅ Linting passed"

if ! bun run format:check; then
    echo "❌ Error: Code formatting check failed"
    echo "💡 Run 'bun run format' to fix formatting issues"
    exit 1
fi

echo "✅ Code formatting check passed"

if ! bun run build; then
    echo "❌ Error: Build failed"
    exit 1
fi

echo "✅ Build successful"

# Test Docker build
echo "🐳 Testing Docker build..."

if ! docker build -t seat-ui-test .; then
    echo "❌ Error: Docker build failed"
    exit 1
fi

echo "✅ Docker build successful"

# Clean up test image
docker rmi seat-ui-test > /dev/null 2>&1 || true

echo ""
echo "🎉 Setup complete! Your CI/CD pipeline is ready."
echo ""
echo "Next steps:"
echo "1. Set up Docker Hub repository (see DOCKER_HUB_SETUP.md)"
echo "2. Configure GitHub secrets:"
echo "   - DOCKER_USERNAME"
echo "   - DOCKER_PASSWORD"
echo "3. Push your changes to trigger the pipeline"
echo ""
echo "The pipeline will:"
echo "✓ Run tests and linting"
echo "✓ Build Docker images for multiple platforms"
echo "✓ Push to Docker Hub"
echo "✓ Run security scans"
echo ""

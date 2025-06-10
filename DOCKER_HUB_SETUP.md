# Docker Hub Setup Guide

This document explains how to set up Docker Hub integration for automatic image builds and pushes.

## Prerequisites

1. **Docker Hub Account**: Create an account at [hub.docker.com](https://hub.docker.com)
2. **GitHub Repository**: Your seat-ui repository on GitHub
3. **Access Token**: Docker Hub access token for authentication

## Step 1: Create Docker Hub Repository

1. Log in to Docker Hub
2. Click "Create Repository"
3. Repository name: `seat-ui`
4. Description: "Interactive seat selection interface"
5. Visibility: Choose Public or Private
6. Click "Create"

## Step 2: Generate Docker Hub Access Token

1. Go to Docker Hub → Account Settings → Security
2. Click "New Access Token"
3. Access Token Description: `GitHub Actions CI/CD`
4. Access permissions: `Read, Write, Delete`
5. Click "Generate"
6. **Important**: Copy the token immediately (you won't see it again)

## Step 3: Configure GitHub Secrets

1. Go to your GitHub repository
2. Navigate to Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Add these secrets:

   ```
   Name: DOCKER_USERNAME
   Secret: your-docker-hub-username

   Name: DOCKER_PASSWORD
   Secret: your-docker-hub-access-token
   ```

## Step 4: Update Repository Configuration

If you're using a different Docker Hub username, update the image name in
`.github/workflows/ci-cd.yml`:

```yaml
env:
  DOCKER_IMAGE: your-username/seat-ui # Change this line
```

## Step 5: Test the Pipeline

1. Push changes to your repository
2. Go to Actions tab in GitHub
3. Watch the CI/CD pipeline run
4. Check Docker Hub for the new image

## Image Tags

The CI/CD pipeline creates these Docker image tags:

- `latest` - Latest build from main branch
- `main-{sha}` - Specific commit from main branch
- `develop` - Latest build from develop branch
- `v1.0.0` - Semantic version tags for releases

## Usage Examples

```bash
# Pull latest image
docker pull attensys/seat-ui:latest

# Run container
docker run -p 80:80 attensys/seat-ui:latest

# Run specific version
docker run -p 80:80 attensys/seat-ui:v1.0.0
```

## Troubleshooting

### Common Issues

1. **Authentication Failed**

   - Check Docker Hub credentials in GitHub secrets
   - Ensure access token has correct permissions

2. **Repository Not Found**

   - Verify Docker Hub repository exists
   - Check repository name matches DOCKER_IMAGE env var

3. **Build Fails**
   - Check Dockerfile syntax
   - Ensure all required files are present
   - Review build logs in GitHub Actions

### Getting Help

- Check GitHub Actions logs for detailed error messages
- Review Docker Hub build logs
- Open an issue if you need assistance

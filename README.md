# Seat UI

[![CI/CD Pipeline](https://github.com/attensys/seat-ui/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/attensys/seat-ui/actions/workflows/ci-cd.yml)
[![Docker Hub](https://img.shields.io/docker/pulls/attensys/seat-ui)](https://hub.docker.com/r/attensys/seat-ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A modern, interactive seat selection interface built with React, TypeScript, and Tailwind CSS.

## Features

- 🎯 **Interactive Seat Selection** - Click to select/deselect available seats
- 🎨 **Visual Status Indicators** - Color-coded seats (Available/Selected/Occupied)
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- ⚡ **Fast Performance** - Built with Vite and optimized for speed
- 🔧 **TypeScript** - Full type safety and excellent developer experience
- 🐳 **Docker Ready** - Containerized for easy deployment

## Quick Start

### Prerequisites

- [Bun](https://bun.sh/) (latest version)
- [Docker](https://www.docker.com/) (optional, for containerized deployment)

### Development

```bash
# Clone the repository
git clone https://github.com/attensys/seat-ui.git
cd seat-ui

# Install dependencies
bun install

# Start development server
bun run dev
```

The application will be available at `http://localhost:3000`

### Production Build

```bash
# Build for production
bun run build

# Preview production build
bun run preview
```

## Docker Deployment

### Using Docker Hub Image

```bash
# Pull and run the latest image
docker run -p 80:80 attensys/seat-ui:latest
```

### Building Locally

```bash
# Build the Docker image
bun run docker:build

# Run the container
bun run docker:run
```

The application will be available at `http://localhost`

## CI/CD Pipeline

This project uses GitHub Actions for continuous integration and deployment:

### Quick Setup

```bash
# Run the setup script to verify everything is ready
./setup-ci.sh
```

### Workflow Overview

- **Testing & Linting** - Runs on every push and pull request
- **Docker Build** - Builds and pushes images to Docker Hub
- **Security Scanning** - Vulnerability scanning with Trivy
- **Multi-platform Support** - Builds for AMD64 and ARM64 architectures

### Docker Hub Images

Images are automatically built and pushed to Docker Hub:

- `attensys/seat-ui:latest` - Latest stable build from main branch
- `attensys/seat-ui:develop` - Development builds
- `attensys/seat-ui:v*` - Tagged releases

### Setting Up CI/CD

To set up the CI/CD pipeline for your own repository:

1. **Fork the repository**

2. **Configure Docker Hub secrets** in your GitHub repository settings:

   ```
   DOCKER_USERNAME - Your Docker Hub username
   DOCKER_PASSWORD - Your Docker Hub access token
   ```

3. **Update the Docker image name** in `.github/workflows/ci-cd.yml`:

   ```yaml
   env:
     DOCKER_IMAGE: your-username/seat-ui
   ```

4. **Create Docker Hub repository**:
   - See [DOCKER_HUB_SETUP.md](./DOCKER_HUB_SETUP.md) for detailed instructions

## Available Scripts

| Command                | Description               |
| ---------------------- | ------------------------- |
| `bun run dev`          | Start development server  |
| `bun run build`        | Build for production      |
| `bun run preview`      | Preview production build  |
| `bun run lint`         | Run ESLint                |
| `bun run lint:fix`     | Fix ESLint errors         |
| `bun run format`       | Format code with Prettier |
| `bun run format:check` | Check code formatting     |
| `bun run docker:build` | Build Docker image        |
| `bun run docker:run`   | Run Docker container      |

## Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Package Manager**: Bun
- **Containerization**: Docker with Nginx
- **CI/CD**: GitHub Actions
- **Code Quality**: ESLint + Prettier

## Architecture

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx      # Navigation header
│   └── Seat.tsx        # Interactive seat component
├── pages/              # Page components
│   └── Home.tsx        # Main seat selection page
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use semantic commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all CI checks pass

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- 📧 Email: [support@attensys.com](mailto:support@attensys.com)
- 🐛 Issues: [GitHub Issues](https://github.com/attensys/seat-ui/issues)
- 📖 Documentation: [Wiki](https://github.com/attensys/seat-ui/wiki)

## Roadmap

- [ ] Add multi-row seat layouts
- [ ] Implement seat reservation system
- [ ] Add real-time seat availability updates
- [ ] Mobile app with React Native
- [ ] Advanced seat filtering and search
- [ ] Integration with payment systems

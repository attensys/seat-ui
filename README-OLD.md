# Seat UI

A modern React frontend application built with Bun, Vite, TypeScript, and Tailwind CSS.

## Features

- ⚡ **Fast Development** - Built with Bun for lightning-fast package management
- 🎨 **Modern Styling** - Tailwind CSS for beautiful, responsive design
- 🔧 **TypeScript** - Full type safety and excellent developer experience
- 🚀 **Vite** - Super fast development server and build tool
- 📱 **Responsive** - Mobile-first design approach
- 🐳 **Docker Ready** - Easy deployment with Docker containers

## Tech Stack

- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Bun** - Fast JavaScript runtime and package manager
- **Docker** - Containerized deployment with Nginx

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed on your machine

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd seat-ui
```

2. Install dependencies:

```bash
bun install
```

3. Start the development server:

```bash
bun run dev
```

The application will be available at `http://localhost:3000`.

## Available Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run preview` - Preview production build
- `bun run lint` - Run ESLint

## Docker Deployment

### Build the Docker image:

```bash
docker build -t seat-ui .
```

### Run the container:

```bash
docker run -p 80:80 seat-ui
```

The application will be available at `http://localhost`.

### Using Docker Compose (optional):

```bash
docker-compose up -d
```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── hooks/         # Custom React hooks
├── utils/         # Utility functions
├── App.tsx        # Main application component
├── main.tsx       # Application entry point
└── index.css      # Global styles
```

## Development

### Adding New Components

Create new components in the `src/components` directory:

```tsx
// src/components/MyComponent.tsx
export default function MyComponent() {
  return (
    <div className="p-4">
      <h2>My Component</h2>
    </div>
  )
}
```

### Adding New Pages

Create new pages in the `src/pages` directory and add routes in `App.tsx`:

```tsx
// src/pages/NewPage.tsx
export default function NewPage() {
  return <div>New Page Content</div>
}

// Add to App.tsx routes
;<Route path="/new-page" element={<NewPage />} />
```

## Styling

This project uses Tailwind CSS for styling. You can:

- Use utility classes directly in your components
- Customize the theme in `tailwind.config.js`
- Add custom CSS in `src/index.css`

## Building for Production

1. Build the application:

```bash
bun run build
```

2. The built files will be in the `dist` directory, ready for deployment.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

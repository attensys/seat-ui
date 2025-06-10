export default function About() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">About Seat UI</h1>

      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Technology Stack</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Frontend</h3>
            <ul className="space-y-1 text-gray-600">
              <li>• React 18 with TypeScript</li>
              <li>• Vite for fast development</li>
              <li>• React Router for navigation</li>
              <li>• Tailwind CSS for styling</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Development</h3>
            <ul className="space-y-1 text-gray-600">
              <li>• Bun for package management</li>
              <li>• ESLint for code quality</li>
              <li>• Hot reload development</li>
              <li>• Docker for deployment</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold mb-4">Features</h2>
        <div className="prose text-gray-600">
          <p className="mb-4">
            This React application demonstrates modern frontend development
            practices with:
          </p>
          <ul className="space-y-2">
            <li>• Fast development server with Vite</li>
            <li>• Type-safe development with TypeScript</li>
            <li>• Beautiful UI components with Tailwind CSS</li>
            <li>• Client-side routing with React Router</li>
            <li>• Containerized deployment with Docker</li>
            <li>• Lightning-fast package management with Bun</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

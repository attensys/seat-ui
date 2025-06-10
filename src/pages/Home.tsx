import { useState } from 'react'

export default function Home() {
  const [count, setCount] = useState(0)

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">
        Welcome to Seat UI
      </h1>

      <div className="max-w-2xl mx-auto mb-8">
        <p className="text-lg text-gray-600 mb-6">
          A modern React application built with Bun, Vite, TypeScript, and
          Tailwind CSS.
        </p>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Interactive Counter</h2>
          <div className="flex items-center justify-center space-x-4">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
              onClick={() => setCount(count - 1)}
            >
              -
            </button>
            <span className="text-3xl font-bold text-gray-800 min-w-[3rem]">
              {count}
            </span>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
              onClick={() => setCount(count + 1)}
            >
              +
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-2">⚡ Fast</h3>
            <p className="text-gray-600">
              Built with Bun for lightning-fast package management and
              development.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-2">🎨 Modern</h3>
            <p className="text-gray-600">
              Styled with Tailwind CSS for beautiful, responsive design.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-2">🔧 TypeScript</h3>
            <p className="text-gray-600">
              Full TypeScript support for better development experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

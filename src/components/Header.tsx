import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <nav className="w-full px-4 py-4">
        <div className="flex items-center justify-center">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            Seat UI
          </Link>
        </div>
      </nav>
    </header>
  )
}

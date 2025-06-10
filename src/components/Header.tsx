import { Link, useLocation } from 'react-router-dom'

export default function Header() {
  const location = useLocation()

  const isActive = (path: string) => {
    return location.pathname === path
  }

  const linkClass = (path: string) => {
    return `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive(path)
        ? 'bg-blue-100 text-blue-700'
        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
    }`
  }

  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            Seat UI
          </Link>
          <div className="flex space-x-2">
            <Link to="/" className={linkClass('/')}>
              Home
            </Link>
            <Link to="/about" className={linkClass('/about')}>
              About
            </Link>
            <Link to="/contact" className={linkClass('/contact')}>
              Contact
            </Link>
            <Link to="/dashboard" className={linkClass('/dashboard')}>
              Dashboard
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}

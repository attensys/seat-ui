import { useState, useEffect, useRef } from 'react'

interface MenuItem {
  label: string
  href?: string
  onClick?: () => void
  divider?: boolean
}

interface HamburgerMenuProps {
  className?: string
  menuItems?: MenuItem[]
  showHostInput?: boolean
}

const defaultMenuItems: MenuItem[] = [
  { label: 'Settings', href: '#' },
  { label: 'Profile', href: '#' },
  { label: 'Help', href: '#' },
  { label: '', divider: true },
  { label: 'Sign out', href: '#' }
]

export default function HamburgerMenu({ 
  className = '', 
  menuItems = defaultMenuItems,
  showHostInput = true
}: HamburgerMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hostValue, setHostValue] = useState('')
  const menuRef = useRef<HTMLDivElement>(null)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // Load host value from localStorage on component mount
  useEffect(() => {
    const savedHost = localStorage.getItem('host')
    if (savedHost) {
      setHostValue(savedHost)
    }
  }, [])

  const handleHostSave = () => {
    if (hostValue.trim()) {
      localStorage.setItem('host', hostValue.trim())
      // Optional: Show a brief success indicator
      console.log('Host saved:', hostValue.trim())
    }
  }

  const handleHostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHostValue(e.target.value)
  }

  const handleHostKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleHostSave()
    }
  }

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMenuOpen])

  return (
    <div ref={menuRef} className={className}>
      <button
        onClick={toggleMenu}
        className="flex flex-col gap-1 p-2 hover:bg-gray-100 rounded-md transition-colors"
        aria-label="Menu"
        type="button"
      >
        <div
          className={`w-6 h-0.5 bg-gray-600 transition-transform duration-200 ${
            isMenuOpen ? 'rotate-45 translate-y-1.5' : ''
          }`}
        ></div>
        <div
          className={`w-6 h-0.5 bg-gray-600 transition-opacity duration-200 ${
            isMenuOpen ? 'opacity-0' : ''
          }`}
        ></div>
        <div
          className={`w-6 h-0.5 bg-gray-600 transition-transform duration-200 ${
            isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
          }`}
        ></div>
      </button>

      {/* Dropdown Menu */}
      {isMenuOpen && (
        <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-48 z-50">
          {showHostInput && (
            <>
              <div className="px-4 py-2 border-b border-gray-200">
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Host
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={hostValue}
                    onChange={handleHostChange}
                    onKeyPress={handleHostKeyPress}
                    placeholder="Enter host URL"
                    className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    onClick={handleHostSave}
                    className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors focus:outline-none focus:ring-1 focus:ring-blue-500"
                    title="Save host"
                  >
                    OK
                  </button>
                </div>
              </div>
            </>
          )}
          {menuItems.map((item, index) => (
            item.divider ? (
              <hr key={index} className="my-1 border-gray-200" />
            ) : (
              <a
                key={index}
                href={item.href}
                onClick={item.onClick}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                {item.label}
              </a>
            )
          ))}
        </div>
      )}
    </div>
  )
}

import logo from '../assets/logo.png'
// import HamburgerMenu from './HamburgerMenu'

export default function Header() {
  return (
    <header className="bg-white shadow-sm relative">
      <div className="flex justify-between items-center px-4 py-2">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Attensys Logo" className="h-8" />
          <span className="text-sm text-gray-600 font-medium">
            Attensys seats
          </span>
        </div>

        {/* Hamburger Menu */}
        {/* <HamburgerMenu menuItems={customMenuItems} /> */}
      </div>
    </header>
  )
}

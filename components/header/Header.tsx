import MobileMenu from './MobileMenu'
import Logo from './Logo'
import Navigation from './Navigation'
import AuthButtons from './AuthButtons'

const navItems = [
  { name: "Home", path: "/" },
  { name: "Why Choose Us", path: "/why" },
  { name: "Pricing", path: "/pricing" },
  { name: "Contact", path: "/contact" },
] as const

const Header = () => {

  return (
    <header className="bg-gradient-to-r from-green-500 to-green-600 shadow-lg w-full sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Logo />
          
          {/* Desktop Navigation */}
          <Navigation 
            navItems={navItems} 
          />
          
          {/* Desktop Auth Buttons */}
          <AuthButtons 
            className="hidden md:flex" 
          />
          
          {/* Mobile Menu */}
          <MobileMenu 
            navItems={navItems} 
          />
        </div>
      </div>
    </header>
  )
}

export default Header


"use client"

import { useState, useRef, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import AuthButtons from './AuthButtons'

interface MobileMenuProps {
  navItems: readonly { name: string; path: string }[]
}

const MobileMenu = ({ navItems }: MobileMenuProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const pathname = usePathname()
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => {
        const id = item.path === '/' ? 'home' : item.path.slice(1)
        return document.getElementById(id)
      }).filter(Boolean)

      const scrollPosition = window.scrollY + 100 // Offset for header

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section && section.offsetTop <= scrollPosition) {
          const id = section.id === 'home' ? '/' : `/${section.id}`
          setActiveSection(id)
          break
        }
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [navItems])

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false)
        buttonRef.current?.focus()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isMenuOpen])

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  const closeMenu = () => setIsMenuOpen(false)

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault()
    
    // Convert path to section ID
    const sectionId = path === '/' ? 'home' : path.slice(1)
    const section = document.getElementById(sectionId)
    
    if (section) {
      const headerOffset = 80 // Height of your fixed header
      const elementPosition = section.offsetTop
      const offsetPosition = elementPosition - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
      
      closeMenu()
    }
  }

  return (
    <div className="md:hidden">
      <button
        ref={buttonRef}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="text-white hover:text-green-100 focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-green-500 p-2 rounded-lg transition-colors duration-200"
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isMenuOpen}
        aria-controls="mobile-menu"
      >
        <motion.svg 
          className="h-6 w-6" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
          animate={{ rotate: isMenuOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </motion.svg>
      </button>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeMenu}
            />

            {/* Menu */}
            <motion.div
              ref={menuRef}
              id="mobile-menu"
              className="fixed top-16 left-0 right-0 bg-white shadow-2xl border-t border-gray-100 z-50 max-h-[calc(100vh-4rem)] overflow-y-auto"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="px-4 py-6 space-y-2">
                {navItems.map((navItem, index) => {
                  const isActive = activeSection === navItem.path
                  
                  return (
                    <motion.div
                      key={navItem.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                    >
                      <a
                        href={navItem.path}
                        onClick={(e) => handleClick(e, navItem.path)}
                        className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:ring-offset-1 cursor-pointer ${
                          isActive 
                            ? 'text-green-600 bg-green-50 shadow-sm border border-green-100' 
                            : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                        }`}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        <span className="flex items-center justify-between">
                          {navItem.name}
                          {isActive && (
                            <motion.span 
                              className="w-2 h-2 bg-green-500 rounded-full"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.2 }}
                            />
                          )}
                        </span>
                      </a>
                    </motion.div>
                  )
                })}
                
                <motion.div
                  className="pt-4 mt-4 border-t border-gray-100"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                >
                  <AuthButtons 
                    className="flex-col space-y-2 space-x-0" 
                    onItemClick={closeMenu} 
                  />
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MobileMenu


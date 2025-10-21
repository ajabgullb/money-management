"use client"

import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface NavigationProps {
  navItems: readonly { name: string; path: string }[]
}

const Navigation = ({ navItems }: NavigationProps) => {
  const [activeSection, setActiveSection] = useState('')

  // Track which section is currently in view
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

    handleScroll() // Set initial active section
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [navItems])

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
    }
  }

  return (
    <nav className="hidden md:block" role="navigation">
      <ul className="flex items-center space-x-1">
        {navItems.map((navItem) => {
          const isActive = activeSection === navItem.path
          
          return (
            <li key={navItem.name}>
              <a
                href={navItem.path}
                onClick={(e) => handleClick(e, navItem.path)}
                className={`relative mx-2 px-4 py-2 rounded-lg text-md font-medium transition-all duration-200 ease-out group focus:outline-none cursor-pointer ${
                  isActive 
                    ? 'text-white bg-white/20 shadow-md' 
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <span className="relative z-10">{navItem.name}</span>
                
                {/* Hover effect */}
                <motion.div
                  className="absolute inset-0 bg-white/10 rounded-lg"
                  initial={false}
                  animate={{ 
                    opacity: isActive ? 1 : 0,
                    scale: isActive ? 1 : 0.8
                  }}
                  whileHover={{ opacity: 0.1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                />
                
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    className="absolute -bottom-2 left-1/2 w-1 h-1 rounded-full bg-white"
                    layoutId="activeIndicator"
                    initial={{ opacity: 0, x: '-50%' }}
                    animate={{ opacity: 1, x: '-50%' }}
                    transition={{ type: "spring", duration: 0.3 }}
                  />
                )}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default Navigation
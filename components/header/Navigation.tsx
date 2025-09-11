"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

interface NavigationProps {
  navItems: readonly { name: string; path: string }[]
}

const Navigation = ({ navItems }: NavigationProps) => {
  const pathname = usePathname()

  return (
    <nav className="hidden md:block" role="navigation">
      <ul className="flex items-center space-x-1">
        {navItems.map((navItem) => {
          const isActive = pathname === navItem.path
          
          return (
            <li key={navItem.name}>
              <Link
                href={navItem.path}
                className={`relative mx-2 px-4 py-2 rounded-lg text-md font-medium transition-all duration-200 ease-out group focus:outline-none  ${
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
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default Navigation

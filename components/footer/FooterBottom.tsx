"use client"

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { startTransition } from 'react'

const currentYear = new Date().getFullYear()

const legalLinks = [
  { name: 'Privacy Policy', path: '/privacy' },
  { name: 'Terms of Service', path: '/terms' },
  { name: 'Cookie Policy', path: '/cookies' },
]

const FooterBottom = () => {
  const router = useRouter()

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault()
    startTransition(() => {
      router.push(path)
    })
  }

  return (
    <div className="border-t border-green-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-green-100 text-sm">
            © {currentYear} EnvoMag. All rights reserved.
          </div>
          
          <div className="flex flex-wrap justify-center md:justify-end items-center space-x-6">
            {legalLinks.map((link, index) => (
              <Link
                key={link.name}
                href={link.path}
                onClick={(e) => handleNavigation(e, link.path)}
                className="text-green-100 hover:text-white text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-green-600 rounded px-1 py-0.5"
                prefetch={true}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FooterBottom
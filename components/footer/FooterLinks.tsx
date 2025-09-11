"use client"

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { startTransition } from 'react'

interface FooterLinksProps {
  title: string
  links: { name: string; path: string }[]
}

const FooterLinks = ({ title, links }: FooterLinksProps) => {
  const router = useRouter()
  const pathname = usePathname()

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault()
    startTransition(() => {
      router.push(path)
    })
  }

  return (
    <div>
      <h4 className="text-lg font-semibold mb-4 text-white">{title}</h4>
      <ul className="space-y-3">
        {links.map((link, index) => {
          const isActive = pathname === link.path
          
          return (
            <motion.li
              key={link.name}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link
                href={link.path}
                onClick={(e) => handleNavigation(e, link.path)}
                className={`text-sm transition-all duration-200 hover:translate-x-1 focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-green-600 rounded px-1 py-0.5 inline-block ${
                  isActive
                    ? 'text-white font-medium'
                    : 'text-green-100 hover:text-white'
                }`}
                prefetch={true}
                aria-current={isActive ? 'page' : undefined}
              >
                <span className="relative">
                  {link.name}
                  {isActive && (
                    <motion.span
                      className="absolute -bottom-1 left-0 w-full h-0.5 bg-white rounded-full"
                      layoutId="footerActiveIndicator"
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </span>
              </Link>
            </motion.li>
          )
        })}
      </ul>
    </div>
  )
}

export default FooterLinks


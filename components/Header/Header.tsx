import React from 'react'
import Link from 'next/link';

const Header = () => {
  const navItems = [
    {name: "Home", path: "#home"},
    {name: "About", path: "#about"},
    {name: "Pricing", path: "#pricing"},
    {name: "Contact", path: "#contact"},
  ]

  return (
    <div className='bg-red-500 w-full h-10'>
      <div>
        Logo
      </div>
      <nav>
        {navItems.map((navItem) => (
          <Link
            key={navItem.name} href={navItem.path}
          >

            {navItem.name}
          </Link>
        ))}
      </nav>
    </div>
  )
}

export default Header

"use client"

import { Provider } from 'react-redux'
import store from '@/store/store'
import React from 'react'
import { usePathname } from 'next/navigation';

import { Header, Footer } from "@/components/index"

const Providers = ({ children }: { children: React.ReactNode }) => {
  const authRoutes = ["/auth/register", "/auth/login", "/dashboard"]
  const pathname = usePathname()

  if (authRoutes.includes(pathname)) {
    return (
      <Provider store={store}>
        {children}
      </Provider>
    )
  } else {
    return(
      <Provider store={store}>
        <Header />
          {children}
        <Footer />
      </Provider>
    )
  }
}

export default Providers

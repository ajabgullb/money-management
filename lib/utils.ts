import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Add to next.config.js for better performance

// const nextConfig = {
//   experimental: {
//     optimizePackageImports: ['framer-motion', 'lucide-react']
//   },
//   compiler: {
//     removeConsole: process.env.NODE_ENV === 'production'
//   }
// }

// // Create a more optimized version with lazy loading:

// const LazyMobileMenu = lazy(() => import('./MobileMenu').then(m => ({ default: m.MobileMenu })))

// // Use with Suspense:
// <Suspense fallback={<MobileMenuSkeleton />}>
//   <LazyMobileMenu navItems={navItems} />
// </Suspense>


// // Add performance monitoring:
// useEffect(() => {
//   // Track header interactions
//   if (typeof window !== 'undefined' && window.gtag) {
//     window.gtag('event', 'header_interaction', {
//       event_category: 'navigation',
//       event_label: 'mobile_menu_toggle'
//     })
//   }
// }, [isMenuOpen])


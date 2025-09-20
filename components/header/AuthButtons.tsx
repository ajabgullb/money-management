import Link from 'next/link'
import { cn } from '@/lib/utils'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { LayoutDashboard } from "lucide-react"

interface AuthButtonsProps {
  className?: string
  onItemClick?: () => void
}

const AuthButtons = ({ className, onItemClick }: AuthButtonsProps) => {
  const authStatus = useSelector((state: RootState) => state.auth.authStatus)

  return (
    <div className={className}>
      {authStatus ?
        <div className={cn(className)}>
          <Link
            href="/dashboard"
            onClick={onItemClick}
            className="bg-white text-green-600 hover:bg-green-50 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ease-out shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
          > 
            Dashboard
          </Link>
        </div>
      : (
      <div className={cn("flex items-center space-x-3", className)}>
        <Link
        href="/auth/login"
        onClick={onItemClick}
        className="text-white/90 bg-green-500 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ease-out hover:bg-white/10 hover:scale-105 active:scale-95"
      >
        Login
        </Link>
        <Link
          href="/auth/register"
          onClick={onItemClick}
          className="bg-white text-green-600 hover:bg-green-50 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ease-out shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
        >
          Sign Up
        </Link>
      </div>
      )}
    </div>
  )
}

export default AuthButtons


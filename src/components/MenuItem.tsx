import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { RemoveLogin } from '../lib/login'

interface MenuItemProps {
  href: string
  logout?: boolean
  children?: ReactNode
}

export default function MenuItem({
  href,
  children,
  logout = false,
}: MenuItemProps) {
  return (
    <Link
      to={href}
      className="p-2 lg:text-4xl text-center text-black rounded-xl bg-gray-500 hover:bg-gray-500/50"
      onClick={() => {
        if (logout) RemoveLogin()
      }}
    >
      {children}
    </Link>
  )
}

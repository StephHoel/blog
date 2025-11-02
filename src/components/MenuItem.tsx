import { ReactNode } from 'react'
import { RemoveLogin } from '../lib/login'
import Link from 'next/link'

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
      href={href}
      className="p-2 lg:text-4xl text-center text-black rounded-xl bg-gray-500 hover:bg-gray-500/50"
      onClick={() => {
        if (logout) RemoveLogin()
      }}
    >
      {children}
    </Link>
  )
}

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/components/ThemeProvider'

export default function Navbar() {
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme()

  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link 
          href="/" 
          className={`nav-link ${pathname === '/' ? 'active' : ''}`}
        >
          Home
        </Link>
        <Link 
          href="/posts" 
          className={`nav-link ${pathname.startsWith('/posts') ? 'active' : ''}`}
        >
          Posts
        </Link>
      </div>
      {/* <button
        onClick={toggleTheme}
        className="theme-toggle"
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? <Sun className="theme-icon" /> : <Moon className="theme-icon" />}
      </button> */}
    </nav>
  )
} 
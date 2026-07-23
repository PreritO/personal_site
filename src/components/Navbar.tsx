'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const items = [
  { href: '/', label: 'Home', exact: true },
  { href: '/writing', label: 'Writing' },
  { href: '/books', label: 'Bookshelf' },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="nav-container" aria-label="Site">
      {items.map(({ href, label, exact }) => {
        const active = exact ? pathname === href : pathname.startsWith(href)
        return (
          <div key={href} className="nav-item-row">
            {/* Dot slot is always reserved so labels never shift; the dot is
                decorative — aria-current carries the state. */}
            <div className={`active-indicator ${active ? 'visible' : ''}`} aria-hidden="true" />
            <Link
              href={href}
              className={`nav-link ${active ? 'active' : ''}`}
              aria-current={active ? 'page' : undefined}
            >
              {label}
            </Link>
          </div>
        )
      })}
    </nav>
  )
}

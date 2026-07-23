'use client'

import { useEffect } from 'react'

// Second half of the once-per-session entrance gate (see globals.css). The
// inline script in layout.tsx handles hard loads before first paint; this
// component marks the session after the first entrance finishes. <html> never
// remounts on client navigation, so the class persisting is what prevents
// replays on soft navs.
export default function MotionGate() {
  useEffect(() => {
    try {
      sessionStorage.setItem('motion-done', '1')
    } catch {
      // sessionStorage unavailable (private mode) — the class below still
      // covers soft navs within this page load.
    }
    const t = setTimeout(() => {
      document.documentElement.classList.add('motion-done')
    }, 1200)
    return () => clearTimeout(t)
  }, [])

  return null
}

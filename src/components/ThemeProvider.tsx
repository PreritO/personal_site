'use client'

import { createContext, useContext } from 'react'

type Theme = 'light' | 'dark'

type ThemeContextType = {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
})

// Light-only per DESIGN.md. The provider is preserved so existing
// `useTheme()` callers (Navbar) keep working without import changes,
// but we no longer touch `document.documentElement.className` — that
// was hijacking the Inter font variable from layout.tsx and forcing
// dark mode whenever the OS preferred dark.
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeContext.Provider value={{ theme: 'light', toggleTheme: () => {} }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}

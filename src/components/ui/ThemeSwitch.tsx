'use client'

import { useEffect, useState } from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'

export default function ThemeSwitch() {
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme') || 'dark'
      setTheme(saved)
      document.body.classList.remove('theme-light', 'theme-dark')
      document.body.classList.add(`theme-${saved}`)
    }
  }, [])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    localStorage.setItem('theme', next)
    document.body.classList.remove('theme-light', 'theme-dark')
    document.body.classList.add(`theme-${next}`)
  }

  return (
    <button
      className="ml-2 p-2 rounded-full bg-[color:var(--color-surface-light)] border border-[color:var(--color-accent)]"
      onClick={toggleTheme}
      aria-label="Alternar tema"
    >
      {theme === 'dark' ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-700" />}
    </button>
  )
} 
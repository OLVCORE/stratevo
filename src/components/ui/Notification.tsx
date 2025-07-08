'use client'

import { useState, useEffect } from 'react'

export default function Notification({ message, type = 'info', duration = 4000 }: { message: string, type?: 'info' | 'success' | 'error', duration?: number }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration)
    return () => clearTimeout(timer)
  }, [duration])

  if (!visible) return null

  const color = type === 'success' ? 'bg-green-600' : type === 'error' ? 'bg-red-600' : 'bg-blue-600'

  return (
    <div className={`fixed top-6 right-6 z-50 px-6 py-3 rounded-lg shadow-lg text-white ${color}`}>
      {message}
    </div>
  )
} 
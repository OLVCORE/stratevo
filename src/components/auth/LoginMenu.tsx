'use client'

import { useState } from 'react'
import AuthModal from './AuthModal'
import { FaUserCircle } from 'react-icons/fa'
import { signOut, useSession } from 'next-auth/react'

export default function LoginMenu() {
  const [open, setOpen] = useState(false)
  const { data: session } = useSession()

  return (
    <>
      {session?.user ? (
        <div className="relative group">
          <button className="btn-gold flex items-center gap-2 px-4 py-2 rounded-md font-medium">
            <FaUserCircle className="text-2xl" />
            {session.user.name || session.user.email}
          </button>
          <div className="absolute right-0 mt-2 w-48 bg-[color:var(--color-surface)] border border-[color:var(--color-accent)] rounded-lg shadow-lg p-4 hidden group-hover:block z-50">
            <button
              className="w-full text-left py-2 px-3 hover:bg-[color:var(--color-surface-light)] rounded"
              onClick={() => signOut({ callbackUrl: '/' })}
            >
              Sair
            </button>
          </div>
        </div>
      ) : (
        <>
          <button
            className="btn-gold flex items-center gap-2 px-4 py-2 rounded-md font-medium"
            onClick={() => setOpen(true)}
          >
            <FaUserCircle className="text-2xl" />
            Entrar / Criar Conta
          </button>
          <AuthModal open={open} onClose={() => setOpen(false)} />
        </>
      )}
    </>
  )
} 
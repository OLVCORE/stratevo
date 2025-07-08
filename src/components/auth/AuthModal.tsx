'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { FaGoogle, FaFacebook, FaLinkedin } from 'react-icons/fa'

export default function AuthModal({ open, onClose }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40">
      <div className="bg-[color:var(--color-surface)] rounded-xl shadow-lg flex flex-col md:flex-row w-full max-w-2xl relative">
        {/* Lado esquerdo: Formulário */}
        <div className="flex-1 p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-2">Bem-vindo!</h2>
          <p className="mb-6 text-on-surface/80">Que bom ter você aqui</p>
          <form
            className="flex flex-col gap-4"
            onSubmit={async (e) => {
              e.preventDefault()
              await signIn('credentials', { email, password, callbackUrl: '/' })
            }}
          >
            <input
              type="email"
              placeholder="E-mail"
              className="input input-bordered"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Senha"
              className="input input-bordered"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <button className="btn btn-primary w-full" type="submit">Entrar</button>
            <a href="#" className="text-sm text-accent text-right">Esqueceu a senha?</a>
          </form>
          <div className="my-4 text-center text-on-surface/60">Ou continuar com</div>
          <div className="flex gap-3 justify-center">
            <button className="btn btn-outline" type="button" onClick={() => signIn('google')}>
              <FaGoogle />
            </button>
            <button className="btn btn-outline" type="button" onClick={() => signIn('facebook')}>
              <FaFacebook />
            </button>
            <button className="btn btn-outline" type="button" onClick={() => signIn('linkedin')}>
              <FaLinkedin />
            </button>
          </div>
          <div className="mt-4 text-center text-on-surface/70">
            Ainda não tem conta? <a href="#" className="text-accent">Criar conta</a>
          </div>
        </div>
        {/* Lado direito: Branding */}
        <div className="hidden md:flex flex-1 bg-gradient-to-br from-stratevo-color to-color-primary items-center justify-center rounded-r-xl p-8">
          <div>
            <img src="/logo-olv.svg" alt="OLV Internacional" className="w-20 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">OLV Internacional</h3>
            <p className="text-white/80 text-sm">
              Integramos Estratégia, Operação e Resultado<br />
              Consultoria Premium em Supply Chain, Comércio Exterior, Internacionalização e Inovação.
            </p>
          </div>
        </div>
        {/* Fechar modal */}
        <button onClick={onClose} className="absolute top-4 right-4 text-2xl text-white/80 hover:text-white">&times;</button>
      </div>
    </div>
  )
} 
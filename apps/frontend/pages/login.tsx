import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { Google, Linkedin, Facebook } from 'lucide-react'

export default function Login() {
  const [loading, setLoading] = useState(false)

  const handleSocialLogin = async (provider: string) => {
    setLoading(true)
    await signIn(provider)
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="bg-surface rounded-2xl shadow-xl p-10 w-full max-w-md flex flex-col items-center">
        <div className="mb-6 flex flex-col items-center">
          <span className="text-3xl font-bold text-accent mb-2">STRATEVO</span>
          <span className="text-lg text-muted">Inteligência de Negócios Completa</span>
        </div>
        <button
          className="w-full flex items-center justify-center gap-3 bg-white text-primary font-semibold py-3 rounded-xl mb-4 shadow hover:bg-accent/10 transition"
          onClick={() => handleSocialLogin('google')}
          disabled={loading}
        >
          <Google className="w-5 h-5" /> Entrar com Google
        </button>
        <button
          className="w-full flex items-center justify-center gap-3 bg-[#0077B5] text-white font-semibold py-3 rounded-xl mb-4 shadow hover:bg-accent/10 transition"
          onClick={() => handleSocialLogin('linkedin')}
          disabled={loading}
        >
          <Linkedin className="w-5 h-5" /> Entrar com LinkedIn
        </button>
        <button
          className="w-full flex items-center justify-center gap-3 bg-[#4267B2] text-white font-semibold py-3 rounded-xl mb-4 shadow hover:bg-accent/10 transition"
          onClick={() => handleSocialLogin('facebook')}
          disabled={loading}
        >
          <Facebook className="w-5 h-5" /> Entrar com Facebook
        </button>
        <span className="text-xs text-muted mt-4">© {new Date().getFullYear()} OLV Internacional</span>
      </div>
    </div>
  )
} 
'use client'

import { useState } from 'react'
import { TrendingUp } from 'lucide-react'

export default function Hero() {
  const [search, setSearch] = useState('')

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-surface-900 via-surface-800 to-primary-500">
      <div className="mb-8 flex flex-col items-center">
        <div className="w-20 h-20 bg-primary-500 rounded-full flex items-center justify-center mb-6 shadow-lg">
          <TrendingUp className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-5xl font-bold text-white mb-4">
          STRATEVO
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl text-center">
          Inteligência de Negócios Completa para Comércio Exterior e Supply Chain
        </p>
      </div>
      <form className="w-full max-w-lg flex" onSubmit={e => { e.preventDefault(); /* implementar busca */ }}>
        <input
          type="text"
          placeholder="Digite o CNPJ ou website da empresa..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 px-4 py-3 rounded-l-lg bg-surface-800 text-white border-none focus:ring-2 focus:ring-accent-500"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-accent-500 text-white rounded-r-lg font-semibold hover:opacity-90 transition"
        >
          Analisar
        </button>
      </form>
    </section>
  )
} 
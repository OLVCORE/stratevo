import Layout from '../components/Layout'
import { useState } from 'react'
import { Sparkles } from 'lucide-react'

export default function ClassificacaoNCM() {
  const [descricao, setDescricao] = useState('')
  const [resultado, setResultado] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function classificar() {
    setLoading(true)
    // Aqui você pode integrar com uma API de IA (GPT/Claude) para classificar o NCM
    // Exemplo mock:
    setTimeout(() => {
      setResultado('8471.30.00 - Máquinas automáticas para processamento de dados')
      setLoading(false)
    }, 1500)
  }

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Classificação NCM com IA</h1>
      <div className="bg-surface rounded-xl p-6 shadow flex flex-col gap-4 max-w-xl">
        <textarea
          className="input input-bordered"
          placeholder="Descreva o produto para classificar o NCM..."
          value={descricao}
          onChange={e => setDescricao(e.target.value)}
        />
        <button className="btn btn-primary flex items-center gap-2" onClick={classificar} disabled={loading}>
          <Sparkles className="w-4 h-4" />
          {loading ? 'Classificando...' : 'Classificar com IA'}
        </button>
        {resultado && (
          <div className="mt-4 p-4 bg-success/10 text-success rounded-xl">
            <strong>NCM Sugerido:</strong> {resultado}
          </div>
        )}
      </div>
    </Layout>
  )
} 
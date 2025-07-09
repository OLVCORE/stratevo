import Layout from '../components/Layout'
import { useState } from 'react'
import { Calculator, FileText } from 'lucide-react'

export default function Simulador() {
  const [produto, setProduto] = useState('')
  const [resultado, setResultado] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  function simular() {
    setLoading(true)
    setTimeout(() => {
      setResultado('Rentabilidade estimada: 28,5%')
      setLoading(false)
    }, 1500)
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Simulador de Operações</h1>
      <div className="bg-surface rounded-xl p-6 shadow max-w-xl flex flex-col gap-4">
        <label className="font-semibold">Produto</label>
        <input
          className="input input-bordered"
          placeholder="Descreva o produto ou serviço..."
          value={produto}
          onChange={e => setProduto(e.target.value)}
        />
        <button className="btn btn-primary flex items-center gap-2" onClick={simular} disabled={loading}>
          <Calculator className="w-4 h-4" />
          {loading ? 'Calculando...' : 'Simular'}
        </button>
        {resultado && (
          <div className="mt-4 p-4 bg-success/10 text-success rounded-xl flex items-center gap-2">
            <FileText className="w-5 h-5" />
            <span>{resultado}</span>
          </div>
        )}
      </div>
    </Layout>
  )
} 
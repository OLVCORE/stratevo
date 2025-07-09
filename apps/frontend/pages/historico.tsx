import Layout from '../components/Layout'
import RelatorioCard from '../components/RelatorioCard'
import RelatorioCardSkeleton from '../components/RelatorioCardSkeleton'
import { useState, useEffect } from 'react'

export default function Historico() {
  const [loading, setLoading] = useState(true)
  const [relatorios, setRelatorios] = useState<any[]>([])

  useEffect(() => {
    // Simula carregamento de dados
    setTimeout(() => {
      setRelatorios([
        { titulo: "Relatório Financeiro - Julho", data: "08/07/2025", status: "Concluído" },
        { titulo: "Análise Comparativa - Junho", data: "01/07/2025", status: "Concluído" }
      ])
      setLoading(false)
    }, 1200)
  }, [])

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Histórico de Relatórios</h1>
      <div className="space-y-4">
        {loading
          ? <>
              <RelatorioCardSkeleton />
              <RelatorioCardSkeleton />
            </>
          : relatorios.map((r, i) => (
              <RelatorioCard key={i} titulo={r.titulo} data={r.data} status={r.status} />
            ))
        }
      </div>
    </Layout>
  )
} 
import Layout from '../components/Layout'
import { FileText, BarChart2 } from 'lucide-react'
import RelatorioCard from '../components/RelatorioCard'
import ExportButtons from '../components/ExportButtons'

export default function Relatorios() {
  function handleExport(type: 'pdf' | 'excel' | 'csv') {
    // Chame a função de exportação real (ex: exportToPDF, exportToExcel, exportToCSV)
    // Exemplo:
    // if (type === 'pdf') exportToPDF(dados)
    // if (type === 'excel') exportToExcel(dados)
    // if (type === 'csv') exportToCSV(dados)
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Relatórios e Análises</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface rounded-xl p-6 shadow flex flex-col items-start">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-6 h-6 text-accent" />
            <span className="text-lg font-semibold">Relatório Financeiro</span>
          </div>
          <span className="text-muted mb-4">Análise detalhada de custos e rentabilidade</span>
          <button className="btn btn-primary">Gerar PDF</button>
        </div>
        <div className="bg-surface rounded-xl p-6 shadow flex flex-col items-start">
          <div className="flex items-center gap-2 mb-2">
            <BarChart2 className="w-6 h-6 text-accent" />
            <span className="text-lg font-semibold">Análise Comparativa</span>
          </div>
          <span className="text-muted mb-4">Comparação entre diferentes relatórios</span>
          <button className="btn btn-primary">Gerar PDF</button>
        </div>
      </div>
      <h2 className="text-xl font-bold mt-10 mb-4">Relatórios Recentes</h2>
      <div className="space-y-4">
        <RelatorioCard titulo="Relatório Financeiro - Julho" data="08/07/2025" status="Concluído" />
        <RelatorioCard titulo="Análise Comparativa - Junho" data="01/07/2025" status="Concluído" />
      </div>
      <ExportButtons onExport={handleExport} />
    </Layout>
  )
} 
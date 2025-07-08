'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { 
  Building2, 
  Globe, 
  TrendingUp, 
  Shield, 
  FileText, 
  Download,
  Share2,
  MapPin,
  Users,
  Calendar,
  DollarSign
} from 'lucide-react'
import ReportTable from './ReportTable'
import SWOTAnalysis from './SWOTAnalysis'
import ExportButtons from './ExportButtons'

interface ReportData {
  _id: string
  companyName: string
  cnpj: string
  website?: string
  status: 'processing' | 'completed' | 'failed'
  data: {
    cadastral: any
    financial: any
    digital: any
    commercial: any
    supplyChain: any
    news: any
    swot: any
  }
  createdAt: string
}

export default function ReportDetail() {
  const params = useParams()
  const [report, setReport] = useState<ReportData | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('cadastral')

  useEffect(() => {
    if (params.id) {
      loadReport(params.id as string)
    }
  }, [params.id])

  const loadReport = async (reportId: string) => {
    try {
      const response = await fetch(`/api/reports/${reportId}`)
      if (response.ok) {
        const data = await response.json()
        setReport(data.report)
      }
    } catch (error) {
      console.error('Erro ao carregar relatório:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-600 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-600 rounded w-1/2 mb-8"></div>
          <div className="grid md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-600 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!report) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Relatório não encontrado</h2>
          <p className="text-gray-400">O relatório solicitado não foi encontrado ou você não tem permissão para visualizá-lo.</p>
        </div>
      </div>
    )
  }

  const tabs = [
    { id: 'cadastral', name: 'Dados Cadastrais', icon: Building2 },
    { id: 'financial', name: 'Econômico-Financeiro', icon: DollarSign },
    { id: 'digital', name: 'Presença Digital', icon: Globe },
    { id: 'commercial', name: 'Atuação Comercial', icon: TrendingUp },
    { id: 'supplyChain', name: 'Supply Chain', icon: Shield },
    { id: 'news', name: 'Notícias', icon: FileText },
    { id: 'swot', name: 'Análise SWOT', icon: TrendingUp },
  ]

  const formatDataForTable = (data: any) => {
    if (!data) return []
    
    return Object.entries(data).map(([key, value]) => ({
      campo: key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' '),
      valor: typeof value === 'object' ? JSON.stringify(value) : String(value),
      link: null // Implementar links quando necessário
    }))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">{report.companyName}</h1>
            <p className="text-gray-400">CNPJ: {report.cnpj}</p>
          </div>
          <div className="flex space-x-4">
            <button className="btn btn-primary">
              <Share2 className="w-4 h-4 mr-2" />
              Compartilhar
            </button>
            <ExportButtons data={report.data} />
          </div>
        </div>

        {/* Status Badge */}
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
          report.status === 'completed' ? 'bg-green-500/10 text-green-400' :
          report.status === 'processing' ? 'bg-yellow-500/10 text-yellow-400' :
          'bg-red-500/10 text-red-400'
        }`}>
          {report.status === 'completed' ? 'Concluído' :
           report.status === 'processing' ? 'Processando' : 'Falhou'}
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-700 mb-6">
        <nav className="flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-accent-500 text-accent-500'
                    : 'border-transparent text-gray-400 hover:text-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            )
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === 'swot' ? (
          <SWOTAnalysis data={report.data.swot} />
        ) : (
          <ReportTable data={formatDataForTable(report.data[activeTab])} />
        )}
      </div>

      {/* Footer */}
      <div className="mt-12 pt-8 border-t border-gray-700">
        <div className="flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center space-x-4">
            <span>Gerado em: {new Date(report.createdAt).toLocaleString()}</span>
            <span>•</span>
            <span>STRATEVO Platform</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4" />
            <span>Localização: {report.data.cadastral?.endereco?.municipio}, {report.data.cadastral?.endereco?.uf}</span>
          </div>
        </div>
      </div>
    </div>
  )
} 
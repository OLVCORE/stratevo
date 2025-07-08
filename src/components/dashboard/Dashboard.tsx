'use client'

import { useState, useEffect } from 'react'
import { 
  Search, 
  FileText, 
  TrendingUp, 
  Users, 
  Globe, 
  Shield,
  Plus,
  Filter,
  Download,
  Share2
} from 'lucide-react'
import StatsOverview from './StatsOverview'
import RecentReports from './RecentReports'

export default function Dashboard() {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadUserReports()
  }, [])

  const loadUserReports = async () => {
    try {
      setLoading(false)
    } catch (error) {
      console.error('Erro ao carregar relatórios:', error)
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-on-surface mb-2">
          Dashboard STRATEVO
        </h1>
        <p className="text-on-surface/70">
          Bem-vindo de volta! Aqui está sua visão geral de inteligência de negócios.
        </p>
      </div>

      <StatsOverview />

      <RecentReports />

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card cursor-pointer hover:shadow-gold transition-all">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Plus className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Novo Relatório</h3>
              <p className="text-sm text-on-surface/70">Analisar empresa</p>
            </div>
          </div>
        </div>

        <div className="card cursor-pointer hover:shadow-gold transition-all">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
              <Download className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h3 className="font-semibold">Exportar Dados</h3>
              <p className="text-sm text-on-surface/70">PDF, Excel, CSV</p>
            </div>
          </div>
        </div>

        <div className="card cursor-pointer hover:shadow-gold transition-all">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Share2 className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Compartilhar</h3>
              <p className="text-sm text-on-surface/70">Relatórios em equipe</p>
            </div>
          </div>
        </div>

        <div className="card cursor-pointer hover:shadow-gold transition-all">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
              <Filter className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h3 className="font-semibold">Filtros Avançados</h3>
              <p className="text-sm text-on-surface/70">Busca personalizada</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
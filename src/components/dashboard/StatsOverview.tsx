'use client'

import { useState, useEffect } from 'react'
import { 
  TrendingUp, 
  FileText, 
  Users, 
  Globe,
  BarChart3,
  Activity
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface Stats {
  totalReports: number
  reportsThisMonth: number
  averageScore: number
  topIndustries: Array<{ name: string; count: number }>
  monthlyReports: Array<{ month: string; count: number }>
}

export default function StatsOverview() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      const response = await fetch('/api/dashboard/stats')
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="card animate-pulse">
            <div className="h-4 bg-gray-600 rounded w-3/4 mb-2"></div>
            <div className="h-8 bg-gray-600 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    )
  }

  if (!stats) {
    return <div className="text-center text-gray-400">Erro ao carregar estatísticas</div>
  }

  return (
    <div className="space-y-8">
      {/* Cards de Estatísticas */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total de Relatórios</p>
              <p className="text-2xl font-bold text-white">{stats.totalReports}</p>
            </div>
            <div className="w-12 h-12 bg-primary-500/10 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-primary-500" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Este Mês</p>
              <p className="text-2xl font-bold text-white">{stats.reportsThisMonth}</p>
            </div>
            <div className="w-12 h-12 bg-accent-500/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-accent-500" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Score Médio</p>
              <p className="text-2xl font-bold text-white">{stats.averageScore}%</p>
            </div>
            <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-green-500" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Empresas Analisadas</p>
              <p className="text-2xl font-bold text-white">{stats.totalReports}</p>
            </div>
            <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Gráfico de Relatórios Mensais */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Relatórios por Mês</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={stats.monthlyReports}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="count" 
                stroke="#1B3F8B" 
                strokeWidth={2}
                dot={{ fill: '#1B3F8B', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Indústrias */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Top Indústrias</h3>
          <div className="space-y-3">
            {stats.topIndustries.map((industry, index) => (
              <div key={industry.name} className="flex items-center justify-between">
                <span className="text-gray-300">{industry.name}</span>
                <span className="text-white font-semibold">{industry.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Atividade Recente</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-300">Relatório gerado - Empresa ABC</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-gray-300">Análise SWOT concluída</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-accent-500 rounded-full"></div>
              <span className="text-gray-300">Exportação PDF realizada</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
'use client'

import { TrendingUp, TrendingDown, Target, AlertTriangle } from 'lucide-react'

interface SWOTData {
  strengths: string[]
  weaknesses: string[]
  opportunities: string[]
  threats: string[]
  insights: string
  recommendations: string[]
}

interface SWOTAnalysisProps {
  data: SWOTData
}

export default function SWOTAnalysis({ data }: SWOTAnalysisProps) {
  if (!data) {
    return (
      <div className="text-center text-gray-400 py-8">
        Análise SWOT não disponível
      </div>
    )
  }

  const swotSections = [
    {
      title: 'Forças (Strengths)',
      items: data.strengths,
      icon: TrendingUp,
      color: 'green',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20',
      textColor: 'text-green-400'
    },
    {
      title: 'Fraquezas (Weaknesses)',
      items: data.weaknesses,
      icon: TrendingDown,
      color: 'red',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/20',
      textColor: 'text-red-400'
    },
    {
      title: 'Oportunidades (Opportunities)',
      items: data.opportunities,
      icon: Target,
      color: 'blue',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
      textColor: 'text-blue-400'
    },
    {
      title: 'Ameaças (Threats)',
      items: data.threats,
      icon: AlertTriangle,
      color: 'yellow',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/20',
      textColor: 'text-yellow-400'
    }
  ]

  return (
    <div className="space-y-8">
      {/* SWOT Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {swotSections.map((section) => {
          const Icon = section.icon
          return (
            <div
              key={section.title}
              className={`card ${section.bgColor} ${section.borderColor} border-2`}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className={`w-10 h-10 ${section.bgColor} rounded-lg flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${section.textColor}`} />
                </div>
                <h3 className={`text-lg font-semibold ${section.textColor}`}>
                  {section.title}
                </h3>
              </div>
              <ul className="space-y-2">
                {section.items.map((item, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${section.bgColor}`}></div>
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>

      {/* Insights */}
      {data.insights && (
        <div className="card bg-blue-500/5 border-blue-500/20">
          <h3 className="text-lg font-semibold text-blue-400 mb-4">Insights Estratégicos</h3>
          <p className="text-gray-300 leading-relaxed">{data.insights}</p>
        </div>
      )}

      {/* Recommendations */}
      {data.recommendations && data.recommendations.length > 0 && (
        <div className="card bg-accent-500/5 border-accent-500/20">
          <h3 className="text-lg font-semibold text-accent-400 mb-4">Recomendações</h3>
          <ul className="space-y-3">
            {data.recommendations.map((recommendation, index) => (
              <li key={index} className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-accent-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-accent-400 text-sm font-semibold">{index + 1}</span>
                </div>
                <span className="text-gray-300">{recommendation}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Proposta de Valor OLV */}
      <div className="card bg-gradient-to-r from-primary-500/10 to-accent-500/10 border-primary-500/20">
        <h3 className="text-lg font-semibold text-primary-400 mb-4">
          💼 Proposta de Valor - OLV Internacional
        </h3>
        <div className="prose prose-invert max-w-none">
          <p className="text-gray-300 mb-4">
            Com base na análise estratégica realizada, a <strong>OLV Internacional</strong> está pronta para apoiar 
            esta empresa com soluções personalizadas em Supply Chain e Comércio Exterior.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-accent-400 font-semibold mb-2">Serviços Recomendados:</h4>
              <ul className="space-y-1 text-gray-300">
                <li>• Desenho de operações internacionais</li>
                <li>• Consultoria em habilitação RADAR</li>
                <li>• Gestão estratégica de Supply Chain</li>
                <li>• Busca internacional de fornecedores</li>
              </ul>
            </div>
            <div>
              <h4 className="text-accent-400 font-semibold mb-2">Benefícios Esperados:</h4>
              <ul className="space-y-1 text-gray-300">
                <li>• Redução de custos operacionais</li>
                <li>• Otimização de prazos</li>
                <li>• Minimização de riscos</li>
                <li>• Expansão de mercado</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 p-4 bg-accent-500/10 rounded-lg border border-accent-500/20">
            <p className="text-accent-400 font-medium">
              "Identificamos que a empresa atua em mercados com potencial para ganhos operacionais 
              significativos com apoio de inteligência em Supply Chain e Comércio Exterior. 
              A OLV Internacional está pronta para atuar como sua parceira estratégica. Vamos conversar?"
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 
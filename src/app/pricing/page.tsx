'use client'

import { useState } from 'react'
import { Check, Star, Zap, Crown, Users, Globe } from 'lucide-react'
import { useSession } from 'next-auth/react'

const plans = [
  {
    name: 'Freemium',
    price: 0,
    period: 'mês',
    description: 'Perfeito para começar',
    features: [
      '5 relatórios por mês',
      'Dados básicos de CNPJ',
      'Exportação CSV',
      'Suporte por e-mail'
    ],
    icon: Users,
    popular: false,
    color: 'gray'
  },
  {
    name: 'Standard',
    price: 97,
    period: 'mês',
    description: 'Para pequenas empresas',
    features: [
      '50 relatórios por mês',
      'Dados completos de CNPJ',
      'Análise SWOT básica',
      'Exportação PDF e Excel',
      'Suporte prioritário',
      'Histórico de relatórios'
    ],
    icon: Zap,
    popular: true,
    color: 'blue'
  },
  {
    name: 'Premium',
    price: 197,
    period: 'mês',
    description: 'Para empresas em crescimento',
    features: [
      '200 relatórios por mês',
      'Análise SWOT avançada',
      'Dados de comércio exterior',
      'API access',
      'Suporte por telefone',
      'Relatórios personalizados',
      'Integração com CRM'
    ],
    icon: Star,
    popular: false,
    color: 'purple'
  },
  {
    name: 'Pro',
    price: 397,
    period: 'mês',
    description: 'Para grandes empresas',
    features: [
      '500 relatórios por mês',
      'Todas as features Premium',
      'Consultoria incluída',
      'Suporte dedicado',
      'Relatórios white-label',
      'Integração customizada',
      'Treinamento da equipe'
    ],
    icon: Crown,
    popular: false,
    color: 'gold'
  },
  {
    name: 'Platinum',
    price: 997,
    period: 'mês',
    description: 'Solução enterprise completa',
    features: [
      'Relatórios ilimitados',
      'Todas as features Pro',
      'Consultoria dedicada',
      'Suporte 24/7',
      'Desenvolvimento customizado',
      'Integração exclusiva',
      'SLA garantido'
    ],
    icon: Globe,
    popular: false,
    color: 'emerald'
  }
]

export default function PricingPage() {
  const { data: session } = useSession()
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly')

  const handleUpgrade = async (planName: string) => {
    if (!session) {
      // Redirecionar para login
      window.location.href = '/auth/signin'
      return
    }

    try {
      const response = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plan: planName.toLowerCase() }),
      })

      if (response.ok) {
        const { sessionId } = await response.json()
        // Redirecionar para Stripe Checkout
        const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
        await stripe?.redirectToCheckout({ sessionId })
      }
    } catch (error) {
      console.error('Erro ao iniciar checkout:', error)
    }
  }

  return (
    <div className="min-h-screen bg-surface-900 py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Escolha seu Plano
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Encontre o plano perfeito para suas necessidades de inteligência de negócios
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-surface-800 rounded-lg p-1 flex">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                billingPeriod === 'monthly'
                  ? 'bg-primary-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Mensal
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                billingPeriod === 'yearly'
                  ? 'bg-primary-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Anual
              <span className="ml-2 text-xs bg-accent-500 text-white px-2 py-1 rounded-full">
                -20%
              </span>
            </button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {plans.map((plan) => {
            const Icon = plan.icon
            const price = billingPeriod === 'yearly' 
              ? Math.round(plan.price * 0.8) 
              : plan.price

            return (
              <div
                key={plan.name}
                className={`relative card ${
                  plan.popular 
                    ? 'ring-2 ring-accent-500 bg-gradient-to-b from-accent-500/10 to-transparent' 
                    : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-accent-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Mais Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <div className={`w-12 h-12 mx-auto mb-4 rounded-lg flex items-center justify-center bg-${plan.color}-500/10`}>
                    <Icon className={`w-6 h-6 text-${plan.color}-500`} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
                  <div className="mb-6">
                    <span className="text-3xl font-bold text-white">R$ {price}</span>
                    <span className="text-gray-400">/{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleUpgrade(plan.name)}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                    plan.popular
                      ? 'bg-accent-500 text-white hover:bg-accent-600'
                      : 'bg-primary-500 text-white hover:bg-primary-600'
                  }`}
                >
                  {plan.price === 0 ? 'Começar Grátis' : 'Escolher Plano'}
                </button>
              </div>
            )
          })}
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Perguntas Frequentes
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-2">
                Posso mudar de plano a qualquer momento?
              </h3>
              <p className="text-gray-400">
                Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento. 
                As mudanças são aplicadas imediatamente.
              </p>
            </div>
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-2">
                Os relatórios são atualizados em tempo real?
              </h3>
              <p className="text-gray-400">
                Nossos relatórios são gerados com dados atualizados das fontes oficiais. 
                O processamento leva alguns minutos para garantir precisão.
              </p>
            </div>
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-2">
                Posso cancelar minha assinatura?
              </h3>
              <p className="text-gray-400">
                Sim, você pode cancelar a qualquer momento. Não há taxas de cancelamento 
                e você mantém acesso até o final do período pago.
              </p>
            </div>
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-2">
                Oferecem suporte técnico?
              </h3>
              <p className="text-gray-400">
                Sim! Todos os planos incluem suporte. Planos Premium e superiores 
                incluem suporte por telefone e chat em tempo real.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
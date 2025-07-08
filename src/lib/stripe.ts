import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

export const plans = {
  freemium: {
    name: 'Freemium',
    price: 0,
    reportsLimit: 5,
    features: ['5 relatórios/mês', 'Dados básicos', 'Exportação CSV']
  },
  standard: {
    name: 'Standard',
    price: 9700, // R$ 97,00 em centavos
    stripePriceId: 'price_standard_monthly',
    reportsLimit: 50,
    features: ['50 relatórios/mês', 'Dados completos', 'Exportação PDF/Excel', 'Análise SWOT']
  },
  premium: {
    name: 'Premium',
    price: 19700, // R$ 197,00 em centavos
    stripePriceId: 'price_premium_monthly',
    reportsLimit: 200,
    features: ['200 relatórios/mês', 'Todas as features Standard', 'API access', 'Suporte prioritário']
  },
  pro: {
    name: 'Pro',
    price: 39700, // R$ 397,00 em centavos
    stripePriceId: 'price_pro_monthly',
    reportsLimit: 500,
    features: ['500 relatórios/mês', 'Todas as features Premium', 'Relatórios personalizados', 'Consultoria']
  },
  platinum: {
    name: 'Platinum',
    price: 99700, // R$ 997,00 em centavos
    stripePriceId: 'price_platinum_monthly',
    reportsLimit: -1, // Ilimitado
    features: ['Relatórios ilimitados', 'Todas as features Pro', 'Consultoria dedicada', 'Integração customizada']
  }
} 
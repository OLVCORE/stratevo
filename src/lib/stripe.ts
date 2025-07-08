import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_PLACEHOLDER', {
  apiVersion: '2023-10-16',
})

export const plans = {
  free: {
    name: 'Freemium',
    price: 0,
    reportsLimit: 5,
    features: ['Acesso básico', '5 relatórios/mês'],
  },
  standard: {
    name: 'Standard',
    price: 97,
    stripePriceId: 'price_PLACEHOLDER_STANDARD',
    reportsLimit: 50,
    features: ['Acesso completo', '50 relatórios/mês'],
  },
  premium: {
    name: 'Premium',
    price: 197,
    stripePriceId: 'price_PLACEHOLDER_PREMIUM',
    reportsLimit: 200,
    features: ['Acesso premium', '200 relatórios/mês'],
  },
  pro: {
    name: 'Pro',
    price: 497,
    stripePriceId: 'price_PLACEHOLDER_PRO',
    reportsLimit: 500,
    features: ['Acesso PRO', '500 relatórios/mês'],
  },
  platinum: {
    name: 'Platinum',
    price: 99700, // R$ 997,00 em centavos
    stripePriceId: 'price_platinum_monthly',
    reportsLimit: -1, // Ilimitado
    features: ['Relatórios ilimitados', 'Todas as features Pro', 'Consultoria dedicada', 'Integração customizada']
  }
} 
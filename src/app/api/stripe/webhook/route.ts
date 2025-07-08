import { NextRequest, NextResponse } from 'next/server'
import { stripe, plans } from '@/lib/stripe'
import { connectDB } from '@/lib/db'
import User from '@/lib/models/User'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')!

  let event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    return NextResponse.json(
      { message: 'Webhook signature verification failed' },
      { status: 400 }
    )
  }

  try {
    await connectDB()

    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object
        const userId = session.metadata?.userId
        const plan = session.metadata?.plan

        if (userId && plan) {
          const user = await User.findById(userId)
          if (user) {
            user.plan = plan
            user.reportsLimit = plans[plan as keyof typeof plans].reportsLimit
            await user.save()
          }
        }
        break

      case 'customer.subscription.updated':
        const subscription = event.data.object
        // Atualizar plano se necessário
        break

      case 'customer.subscription.deleted':
        const deletedSubscription = event.data.object
        // Reverter para plano gratuito
        break
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { message: 'Webhook handler failed' },
      { status: 500 }
    )
  }
} 
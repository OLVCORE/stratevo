import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { stripe, plans } from '@/lib/stripe'
import { connectDB } from '@/lib/db'
import User from '@/lib/models/User'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { message: 'Não autorizado' },
        { status: 401 }
      )
    }

    const { plan } = await request.json()
    
    if (!plans[plan as keyof typeof plans]) {
      return NextResponse.json(
        { message: 'Plano inválido' },
        { status: 400 }
      )
    }

    await connectDB()
    
    const user = await User.findOne({ email: session.user.email })
    if (!user) {
      return NextResponse.json(
        { message: 'Usuário não encontrado' },
        { status: 404 }
      )
    }

    const selectedPlan = plans[plan as keyof typeof plans]
    
    if (selectedPlan.price === 0) {
      // Plano gratuito - atualizar diretamente
      user.plan = plan
      user.reportsLimit = selectedPlan.reportsLimit
      await user.save()
      
      return NextResponse.json({ 
        message: 'Plano atualizado com sucesso',
        plan: plan
      })
    }

    // Criar sessão do Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: selectedPlan.stripePriceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXTAUTH_URL}/dashboard?success=true&plan=${plan}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/pricing?canceled=true`,
      customer_email: user.email,
      metadata: {
        userId: user._id.toString(),
        plan: plan,
      },
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (error) {
    console.error('Erro ao criar checkout:', error)
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
} 
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { connectDB } from '@/lib/db'
import Report from '@/lib/models/Report'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ message: 'Não autorizado' }, { status: 401 })
    }

    await connectDB()
    const userId = session.user.id

    // Total de relatórios
    const totalReports = await Report.countDocuments({ userId })
    // Relatórios deste mês
    const startOfMonth = new Date()
    startOfMonth.setDate(1)
    startOfMonth.setHours(0, 0, 0, 0)
    const reportsThisMonth = await Report.countDocuments({
      userId,
      createdAt: { $gte: startOfMonth }
    })

    // Score médio (exemplo fictício)
    const averageScore = 98

    // Top indústrias (exemplo fictício)
    const topIndustries = [
      { name: 'Tecnologia', count: 12 },
      { name: 'Comércio', count: 8 },
      { name: 'Logística', count: 5 }
    ]

    // Relatórios por mês (exemplo fictício)
    const monthlyReports = [
      { month: 'Jan', count: 2 },
      { month: 'Feb', count: 4 },
      { month: 'Mar', count: 6 },
      { month: 'Apr', count: 8 },
      { month: 'May', count: 10 }
    ]

    return NextResponse.json({
      totalReports,
      reportsThisMonth,
      averageScore,
      topIndustries,
      monthlyReports
    })
  } catch (error) {
    console.error('Erro ao carregar estatísticas:', error)
    return NextResponse.json({ message: 'Erro interno do servidor' }, { status: 500 })
  }
} 
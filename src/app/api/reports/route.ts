import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { connectDB } from '@/lib/db'
import Report from '@/lib/models/Report'
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

    const { cnpj, website } = await request.json()

    if (!cnpj) {
      return NextResponse.json(
        { message: 'CNPJ é obrigatório' },
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

    if (user.reportsLimit !== -1 && user.reportsCount >= user.reportsLimit) {
      return NextResponse.json(
        { message: 'Limite de relatórios atingido. Faça upgrade do seu plano.' },
        { status: 403 }
      )
    }

    const report = new Report({
      userId: user._id,
      companyName: 'Empresa a ser analisada',
      cnpj,
      website,
      status: 'processing',
    })

    await report.save()

    user.reportsCount += 1
    await user.save()

    processReport(report._id, cnpj, website)

    return NextResponse.json(
      { 
        message: 'Relatório iniciado',
        reportId: report._id,
        status: 'processing'
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Create report error:', error)
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { message: 'Não autorizado' },
        { status: 401 }
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

    const reports = await Report.find({ userId: user._id })
      .sort({ createdAt: -1 })
      .limit(20)

    return NextResponse.json({ reports })
  } catch (error) {
    console.error('Get reports error:', error)
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

async function processReport(reportId: string, cnpj: string, website?: string) {
  try {
    await new Promise(resolve => setTimeout(resolve, 5000))

    await connectDB()
    const report = await Report.findById(reportId)
    if (report) {
      report.status = 'completed'
      report.data = {
        cadastral: { cnpj, status: 'Processado' },
        financial: { status: 'Processado' },
        digital: { status: 'Processado' },
        commercial: { status: 'Processado' },
        supplyChain: { status: 'Processado' },
        news: { status: 'Processado' },
        swot: { status: 'Processado' },
      }
      await report.save()
    }
  } catch (error) {
    console.error('Process report error:', error)
    
    await connectDB()
    const report = await Report.findById(reportId)
    if (report) {
      report.status = 'failed'
      await report.save()
    }
  }
} 
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { connectDB } from '@/lib/db'
import Report from '@/lib/models/Report'
import { exportToPDF } from '@/utils/exportToPDF'
import { exportToCSV } from '@/utils/exportToCSV'
import { exportToExcel } from '@/utils/exportToExcel'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ message: 'Não autorizado' }, { status: 401 })
    }

    const { reportId, format } = await request.json()
    
    if (!reportId || !format) {
      return NextResponse.json(
        { message: 'ID do relatório e formato são obrigatórios' },
        { status: 400 }
      )
    }

    await connectDB()
    
    const report = await Report.findOne({ 
      _id: reportId, 
      userId: session.user.email 
    })
    
    if (!report) {
      return NextResponse.json(
        { message: 'Relatório não encontrado' },
        { status: 404 }
      )
    }

    let fileBuffer: Buffer
    let filename: string
    let contentType: string

    switch (format) {
      case 'pdf':
        fileBuffer = await exportToPDF(report.data, `${report.companyName}_relatorio.pdf`)
        filename = `${report.companyName}_relatorio.pdf`
        contentType = 'application/pdf'
        break
        
      case 'csv':
        fileBuffer = await exportToCSV(report.data, `${report.companyName}_relatorio.csv`)
        filename = `${report.companyName}_relatorio.csv`
        contentType = 'text/csv'
        break
        
      case 'excel':
        fileBuffer = await exportToExcel(report.data, `${report.companyName}_relatorio.xlsx`)
        filename = `${report.companyName}_relatorio.xlsx`
        contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        break
        
      default:
        return NextResponse.json(
          { message: 'Formato não suportado' },
          { status: 400 }
        )
    }

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    })
  } catch (error) {
    console.error('Erro ao exportar relatório:', error)
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function sendLeadToCRM(lead: { name: string, email: string, company: string }) {
  // Exemplo fictício para Engage CRM
  await fetch('https://api.engagecrm.com/leads', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${process.env.ENGAGE_API_KEY}` },
    body: JSON.stringify(lead)
  })
}

export async function addToMailchimp(email: string, name: string) {
  await fetch('https://usX.api.mailchimp.com/3.0/lists/{list_id}/members', {
    method: 'POST',
    headers: {
      'Authorization': `apikey ${process.env.MAILCHIMP_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email_address: email, status: 'subscribed', merge_fields: { FNAME: name } })
  })
} 
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { connectDB } from '@/lib/db'
import Report from '@/lib/models/Report'
import { Parser as Json2csvParser } from 'json2csv'
import * as XLSX from 'xlsx'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ message: 'Não autorizado' }, { status: 401 })
    }

    const { reportId, format } = await request.json()
    await connectDB()
    const report = await Report.findById(reportId)
    if (!report) {
      return NextResponse.json({ message: 'Relatório não encontrado' }, { status: 404 })
    }

    // Estrutura de dados para exportação
    const exportData = [
      { campo: 'CNPJ', valor: report.cnpj },
      { campo: 'Razão Social', valor: report.companyName },
      // ...adicione outros campos relevantes
    ]

    if (format === 'csv') {
      const parser = new Json2csvParser({ fields: ['campo', 'valor'] })
      const csv = parser.parse(exportData)
      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename=relatorio-${report.cnpj}.csv`
        }
      })
    }

    if (format === 'excel') {
      const worksheet = XLSX.utils.json_to_sheet(exportData)
      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Relatório')
      const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' })
      return new NextResponse(buffer, {
        headers: {
          'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'Content-Disposition': `attachment; filename=relatorio-${report.cnpj}.xlsx`
        }
      })
    }

    if (format === 'pdf') {
      const doc = new jsPDF()
      autoTable(doc, {
        head: [['Campo', 'Valor']],
        body: exportData.map(row => [row.campo, row.valor])
      })
      const pdf = doc.output('arraybuffer')
      return new NextResponse(Buffer.from(pdf), {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename=relatorio-${report.cnpj}.pdf`
        }
      })
    }

    return NextResponse.json({ message: 'Formato não suportado' }, { status: 400 })
  } catch (error) {
    console.error('Erro ao exportar relatório:', error)
    return NextResponse.json({ message: 'Erro interno do servidor' }, { status: 500 })
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
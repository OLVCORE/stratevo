import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    return NextResponse.json({ 
      message: 'Exportação em desenvolvimento',
      status: 'success'
    })
  } catch (error) {
    console.error('Erro ao exportar relatório:', error)
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
} 
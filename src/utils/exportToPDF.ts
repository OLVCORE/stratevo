import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { cleanCnpj } from 'CAMINHO_DO_UTILS'

declare global {
  var mongoose: any;
}

export function exportToPDF(data: any[], filename = 'relatorio.pdf'): Uint8Array {
  const doc = new jsPDF()
  const headers = Object.keys(data[0])
  const rows = data.map(row => headers.map(h => row[h]))
  doc.autoTable({
    head: [headers],
    body: rows,
  })
  return doc.output('arraybuffer') as Uint8Array
} 
import jsPDF from 'jspdf'
import 'jspdf-autotable'

export function exportToPDF(data: any[], filename = 'relatorio.pdf') {
  const doc = new jsPDF()
  const headers = Object.keys(data[0])
  const rows = data.map(row => headers.map(h => row[h]))
  doc.autoTable({
    head: [headers],
    body: rows,
  })
  doc.save(filename)
} 
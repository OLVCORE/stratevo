import * as XLSX from 'xlsx'

export function exportToExcel(data: any[], filename = 'relatorio.xlsx') {
  const worksheet = XLSX.utils.json_to_sheet(data)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Relatório')
  XLSX.writeFile(workbook, filename)
} 
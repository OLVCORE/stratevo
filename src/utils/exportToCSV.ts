import { Parser as Json2csvParser } from 'json2csv'

export function exportToCSV(data: any[], filename = 'relatorio.csv') {
  const csvRows = []
  // Cabeçalho
  const headers = Object.keys(data[0])
  csvRows.push(headers.join(','))
  // Linhas
  for (const row of data) {
    const values = headers.map(header => `"${(row[header] ?? '').toString().replace(/"/g, '""')}"`)
    csvRows.push(values.join(','))
  }
  const csvContent = csvRows.join('\n')
  const blob = new Blob([csvContent], { type: 'text/csv' })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.setAttribute('href', url)
  a.setAttribute('download', filename)
  a.click()
} 
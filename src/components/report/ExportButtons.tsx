'use client'

import { exportToCSV } from '../../utils/exportToCSV'
import { exportToPDF } from '../../utils/exportToPDF'
import { exportToExcel } from '../../utils/exportToExcel'

export default function ExportButtons({ data }: { data: any }) {
  // Adapte para passar os dados corretos do relatório
  return (
    <div className="flex gap-2">
      <button className="btn btn-primary" onClick={() => exportToPDF(data)}>
        PDF
      </button>
      <button className="btn btn-accent" onClick={() => exportToExcel(data)}>
        Excel
      </button>
      <button className="btn btn-accent" onClick={() => exportToCSV(data)}>
        CSV
      </button>
    </div>
  )
} 
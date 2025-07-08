'use client'

import { useEffect, useState } from 'react'

export default function RecentReports() {
  const [reports, setReports] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/reports')
      .then(res => res.json())
      .then(data => setReports(data.reports || []))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div>Carregando relatórios...</div>
  if (!reports.length) return <div>Nenhum relatório recente.</div>

  return (
    <div className="card mt-8">
      <h3 className="text-lg font-semibold mb-4">Relatórios Recentes</h3>
      <ul className="divide-y divide-surface-700">
        {reports.map((report) => (
          <li key={report._id} className="py-2 flex flex-col md:flex-row md:items-center md:justify-between">
            <span>
              <span className="font-semibold">{report.companyName}</span> — {report.cnpj}
            </span>
            <span className="text-xs text-gray-400">{new Date(report.createdAt).toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  )
} 
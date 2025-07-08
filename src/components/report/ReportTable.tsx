import React from 'react'

type ReportRow = {
  campo: string
  valor: string
  link?: string
}

export default function ReportTable({ data }: { data: ReportRow[] }) {
  return (
    <table className="min-w-full border rounded-xl overflow-hidden bg-surface-800">
      <thead>
        <tr>
          <th className="px-4 py-2 text-left bg-primary-500 text-white">Campo</th>
          <th className="px-4 py-2 text-left bg-primary-500 text-white">Informação Encontrada</th>
          <th className="px-4 py-2 text-left bg-primary-500 text-white">Fonte/Link</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx} className="border-b border-surface-700">
            <td className="px-4 py-2 font-semibold">{row.campo}</td>
            <td className="px-4 py-2">{row.valor}</td>
            <td className="px-4 py-2">
              {row.link ? (
                <a href={row.link} target="_blank" rel="noopener noreferrer" className="text-accent-500 underline">
                  Fonte
                </a>
              ) : (
                '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
} 
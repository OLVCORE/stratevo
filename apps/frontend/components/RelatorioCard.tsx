import { FileText } from 'lucide-react'

export default function RelatorioCard({ titulo, data, status }: { titulo: string, data: string, status: string }) {
  return (
    <div className="bg-surface rounded-xl p-4 flex items-center gap-4 shadow">
      <FileText className="w-8 h-8 text-accent" />
      <div className="flex-1">
        <div className="font-semibold">{titulo}</div>
        <div className="text-xs text-muted">{data}</div>
      </div>
      <span className={`text-xs font-bold rounded px-2 py-1 ${status === 'Concluído' ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'}`}>
        {status}
      </span>
    </div>
  )
} 
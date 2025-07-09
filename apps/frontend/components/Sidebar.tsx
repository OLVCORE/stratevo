import { Home, FileText, BarChart2, Settings, LogOut } from 'lucide-react'

export default function Sidebar() {
  return (
    <aside className="w-64 bg-surface flex flex-col p-4 border-r border-surface-700">
      <div className="mb-8 flex items-center gap-2">
        <span className="text-2xl font-bold text-accent">ST</span>
        <span className="text-lg font-semibold text-white">STRATEVO</span>
      </div>
      <nav className="flex-1 space-y-2">
        <a href="/dashboard" className="flex items-center gap-3 p-2 rounded-xl hover:bg-primary/20">
          <Home className="w-5 h-5" /> Dashboard
        </a>
        <a href="/relatorios" className="flex items-center gap-3 p-2 rounded-xl hover:bg-primary/20">
          <FileText className="w-5 h-5" /> Relatórios
        </a>
        <a href="/analises" className="flex items-center gap-3 p-2 rounded-xl hover:bg-primary/20">
          <BarChart2 className="w-5 h-5" /> Análises
        </a>
        <a href="/configuracoes" className="flex items-center gap-3 p-2 rounded-xl hover:bg-primary/20">
          <Settings className="w-5 h-5" /> Configurações
        </a>
      </nav>
      <div className="mt-8">
        <button className="flex items-center gap-2 text-error hover:underline">
          <LogOut className="w-5 h-5" /> Sair
        </button>
      </div>
    </aside>
  )
} 
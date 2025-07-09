import { useState } from 'react'
import { Search } from 'lucide-react'

export default function RelatorioSearch({ onSearch }: { onSearch: (query: string) => void }) {
  const [query, setQuery] = useState('')

  return (
    <div className="flex items-center gap-2 mb-6">
      <input
        type="text"
        className="input input-bordered w-full max-w-xs"
        placeholder="Buscar relatório, cliente, CNPJ..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && onSearch(query)}
      />
      <button className="btn btn-accent" onClick={() => onSearch(query)}>
        <Search className="w-4 h-4" />
      </button>
    </div>
  )
} 
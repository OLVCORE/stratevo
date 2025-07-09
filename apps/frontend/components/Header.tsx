import { Sun, Moon, Bell, User } from 'lucide-react'

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-surface border-b border-surface-700">
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full hover:bg-primary/10">
          <Bell className="w-5 h-5 text-accent" />
        </button>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full hover:bg-primary/10">
          <Sun className="w-5 h-5 text-accent" />
        </button>
        <button className="p-2 rounded-full hover:bg-primary/10">
          <User className="w-5 h-5 text-accent" />
        </button>
      </div>
    </header>
  )
} 
import LoginMenu from '@/components/auth/LoginMenu'
import ThemeSwitch from '@/components/ui/ThemeSwitch'

export default function Header() {
  return (
    <header className="header-wrapper flex items-center justify-between px-6 py-3">
      <div className="flex items-center gap-4">
        <img src="/logo-olv.svg" alt="Logo" className="logo-olv-padrao" />
        <span className="font-bold text-stratevo-color text-lg">STRATEVO</span>
      </div>
      <div className="flex items-center gap-4">
        <ThemeSwitch />
        <LoginMenu />
      </div>
    </header>
  )
} 
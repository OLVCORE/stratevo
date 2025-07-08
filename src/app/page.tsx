import Hero from '../components/sections/Hero'
import Dashboard from '../components/dashboard/Dashboard'

export default function Home() {
  // Exemplo: se usuário estiver logado, mostrar Dashboard
  // const session = useSession() // implementar depois
  // if (session) return <Dashboard />

  return (
    <main>
      <Hero />
    </main>
  )
} 
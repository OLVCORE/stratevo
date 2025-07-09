import Layout from '../components/Layout'

export default function Dashboard() {
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface rounded-xl p-6 shadow flex flex-col items-start">
          <span className="text-muted text-sm mb-2">Total de Relatórios</span>
          <span className="text-2xl font-bold text-accent">12</span>
        </div>
        <div className="bg-surface rounded-xl p-6 shadow flex flex-col items-start">
          <span className="text-muted text-sm mb-2">Análises Realizadas</span>
          <span className="text-2xl font-bold text-accent">8</span>
        </div>
        <div className="bg-surface rounded-xl p-6 shadow flex flex-col items-start">
          <span className="text-muted text-sm mb-2">Usuários Ativos</span>
          <span className="text-2xl font-bold text-accent">3</span>
        </div>
      </div>
    </Layout>
  )
} 
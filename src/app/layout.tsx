import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'STRATEVO - Inteligência de Negócios',
  description: 'Plataforma completa de inteligência de mercado, comércio exterior e Supply Chain',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="dark">
      <body className="font-sans bg-surface-900 text-white">
        {children}
      </body>
    </html>
  )
} 
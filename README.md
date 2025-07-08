# STRATEVO

Plataforma SaaS de Inteligência de Negócios, Supply Chain e Comércio Exterior.

## Funcionalidades

- Geração automática de relatórios empresariais completos
- Análise SWOT com IA (OpenAI)
- Exportação em PDF, Excel, CSV
- Dashboard, histórico, planos e integrações
- Integração com CRM e e-mail marketing

## Instalação

```bash
npm install
npm run dev
```

## Configuração

Crie um arquivo `.env.local` com as variáveis necessárias (MongoDB, Stripe, OpenAI, etc).

## Testes

```bash
npm run test
```

## Documentação da API

Veja o arquivo `docs/openapi.yaml` para detalhes das rotas.

---

## 10. **Refino Visual: Exemplo de Componente de Loader**

### a) `src/components/ui/Loader.tsx`

```tsx:src/components/ui/Loader.tsx
export default function Loader({ message = 'Carregando...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="w-12 h-12 border-4 border-accent-500 border-t-transparent rounded-full animate-spin mb-4"></div>
      <span className="text-accent-500 font-medium">{message}</span>
    </div>
  )
}
```

---

## 11. **Exemplo de Teste de Integração (API Route)**

### a) `src/app/api/reports/__tests__/route.test.ts`

```typescript:src/app/api/reports/__tests__/route.test.ts
import { POST } from '../route'

describe('POST /api/reports', () => {
  it('deve retornar erro se não enviar CNPJ', async () => {
    const req = { json: async () => ({}) } as any
    const res = await POST(req)
    expect(res.status).toBe(400)
  })
})
```

---

## 12. **Checklist Final de Boas Práticas**

- [x] Estrutura modular e escalável
- [x] Testes unitários e de integração
- [x] Documentação de API
- [x] README claro
- [x] Componentes reutilizáveis e estilização consistente
- [x] Pronto para deploy em Vercel

---

**Se quiser, posso seguir com exemplos de testes para outros módulos, expandir a documentação, ou detalhar o deploy e CI/CD.  
Só avisar!** 
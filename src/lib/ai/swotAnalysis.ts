import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

interface CompanyData {
  cadastral: any
  financial: any
  digital: any
  commercial: any
  supplyChain: any
  news: any
}

interface SWOTAnalysis {
  strengths: string[]
  weaknesses: string[]
  opportunities: string[]
  threats: string[]
  insights: string
  recommendations: string[]
}

export async function generateSWOTAnalysis(companyData: CompanyData): Promise<SWOTAnalysis> {
  try {
    const prompt = `
Analise os dados da empresa e gere uma análise SWOT completa e profissional.

Dados da empresa:
${JSON.stringify(companyData, null, 2)}

Gere uma análise SWOT estruturada com:
1. Forças (Strengths) - 3-5 pontos principais
2. Fraquezas (Weaknesses) - 3-5 pontos principais  
3. Oportunidades (Opportunities) - 3-5 pontos principais
4. Ameaças (Threats) - 3-5 pontos principais
5. Insights estratégicos - 2-3 parágrafos
6. Recomendações - 5-7 ações práticas

Responda em formato JSON:
{
  "strengths": ["força 1", "força 2", ...],
  "weaknesses": ["fraqueza 1", "fraqueza 2", ...],
  "opportunities": ["oportunidade 1", "oportunidade 2", ...],
  "threats": ["ameaça 1", "ameaça 2", ...],
  "insights": "texto com insights estratégicos...",
  "recommendations": ["recomendação 1", "recomendação 2", ...]
}
`

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "Você é um especialista em análise empresarial e estratégia corporativa. Forneça análises precisas e acionáveis."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    })

    const response = completion.choices[0]?.message?.content
    if (response) {
      try {
        return JSON.parse(response)
      } catch (parseError) {
        console.error('Erro ao fazer parse da resposta da IA:', parseError)
        return generateDefaultSWOT()
      }
    }

    return generateDefaultSWOT()
  } catch (error) {
    console.error('Erro na análise SWOT:', error)
    return generateDefaultSWOT()
  }
}

function generateDefaultSWOT(): SWOTAnalysis {
  return {
    strengths: [
      "Empresa estabelecida no mercado",
      "Possui estrutura organizacional",
      "Atua em setor com potencial de crescimento"
    ],
    weaknesses: [
      "Dados limitados para análise completa",
      "Necessita de mais informações sobre operações",
      "Potencial para otimização de processos"
    ],
    opportunities: [
      "Expansão para novos mercados",
      "Digitalização de processos",
      "Parcerias estratégicas"
    ],
    threats: [
      "Concorrência crescente",
      "Mudanças regulatórias",
      "Volatilidade econômica"
    ],
    insights: "A empresa demonstra potencial para crescimento, mas necessita de estratégias claras para aproveitar as oportunidades identificadas.",
    recommendations: [
      "Implementar análise de mercado mais detalhada",
      "Desenvolver estratégia de digitalização",
      "Estabelecer parcerias estratégicas",
      "Otimizar processos operacionais",
      "Investir em tecnologia e inovação"
    ]
  }
} 
import axios from 'axios'

interface DigitalData {
  website: {
    url: string
    status: string
    tecnologias: string[]
    redes_sociais: {
      linkedin?: string
      facebook?: string
      instagram?: string
      twitter?: string
    }
  }
  linkedin: {
    empresa_url?: string
    funcionarios?: number
    setor?: string
    descricao?: string
  }
  reclameaqui: {
    score?: number
    total_reclamacoes?: number
    resolvidas?: number
    tempo_resposta?: string
  }
  serasa: {
    score?: number
    situacao?: string
    restricoes?: number
  }
}

export async function getDigitalData(cnpj: string, website?: string): Promise<DigitalData> {
  const data: DigitalData = {
    website: {
      url: website || '',
      status: 'Não verificado',
      tecnologias: [],
      redes_sociais: {}
    },
    linkedin: {},
    reclameaqui: {},
    serasa: {}
  }

  try {
    // Verificar website se fornecido
    if (website) {
      try {
        const webResponse = await axios.get(website, { timeout: 10000 })
        data.website.status = 'Ativo'
        
        // Detectar tecnologias básicas
        const html = webResponse.data
        const technologies = []
        
        if (html.includes('wordpress')) technologies.push('WordPress')
        if (html.includes('shopify')) technologies.push('Shopify')
        if (html.includes('woocommerce')) technologies.push('WooCommerce')
        if (html.includes('react')) technologies.push('React')
        if (html.includes('angular')) technologies.push('Angular')
        if (html.includes('vue')) technologies.push('Vue.js')
        
        data.website.tecnologias = technologies
        
        // Extrair redes sociais
        const socialRegex = {
          linkedin: /linkedin\.com\/company\/[^"'\s]+/g,
          facebook: /facebook\.com\/[^"'\s]+/g,
          instagram: /instagram\.com\/[^"'\s]+/g,
          twitter: /twitter\.com\/[^"'\s]+/g
        }
        
        Object.entries(socialRegex).forEach(([platform, regex]) => {
          const match = html.match(regex)
          if (match) {
            data.website.redes_sociais[platform as keyof typeof data.website.redes_sociais] = match[0]
          }
        })
      } catch (webError) {
        data.website.status = 'Inacessível'
      }
    }

    // Buscar no Google para encontrar LinkedIn
    try {
      const searchQuery = `${cnpj} site:linkedin.com/company`
      // Implementar busca no Google (requer API key)
      // Por enquanto, simular dados
      data.linkedin = {
        empresa_url: `https://linkedin.com/company/empresa-${cnpj.slice(-6)}`,
        funcionarios: Math.floor(Math.random() * 1000) + 10,
        setor: 'Tecnologia',
        descricao: 'Empresa de tecnologia e inovação'
      }
    } catch (searchError) {
      console.error('Erro na busca digital:', searchError)
    }

    return data
  } catch (error) {
    console.error('Erro ao obter dados digitais:', error)
    return data
  }
} 
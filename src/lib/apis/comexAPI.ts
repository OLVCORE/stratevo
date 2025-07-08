import axios from 'axios'

interface ComexData {
  importacoes: Array<{
    ano: number
    valor: number
    peso: number
    ncm: string
    pais: string
  }>
  exportacoes: Array<{
    ano: number
    valor: number
    peso: number
    ncm: string
    pais: string
  }>
  radar: {
    habilitado: boolean
    tipo: string
    data_habilitacao?: string
  }
}

export async function getComexData(cnpj: string): Promise<ComexData | null> {
  try {
    const cleanCnpj = cnpj.replace(/[^\d]/g, '')
    
    // Consultar dados do MDIC/ComexStat
    const response = await axios.get(`https://comexstat.mdic.gov.br/api/v1/empresa/${cleanCnpj}`, {
      timeout: 15000,
      headers: {
        'User-Agent': 'STRATEVO-Platform/1.0'
      }
    })

    if (response.data) {
      return {
        importacoes: response.data.importacoes || [],
        exportacoes: response.data.exportacoes || [],
        radar: {
          habilitado: response.data.radar?.habilitado || false,
          tipo: response.data.radar?.tipo || 'Não habilitado',
          data_habilitacao: response.data.radar?.data_habilitacao
        }
      }
    }

    return null
  } catch (error) {
    console.error('Erro ao consultar dados de comércio exterior:', error)
    return null
  }
} 
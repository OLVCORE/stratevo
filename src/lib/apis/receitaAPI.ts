import axios from 'axios'

interface ReceitaData {
  cnpj: string
  razao_social: string
  nome_fantasia?: string
  natureza_juridica: string
  data_abertura: string
  capital_social: string
  porte: string
  situacao: string
  regime_tributario: string
  endereco: {
    logradouro: string
    numero: string
    complemento?: string
    bairro: string
    municipio: string
    uf: string
    cep: string
  }
  telefone?: string
  email?: string
  quadro_socios: Array<{
    nome: string
    qualificacao: string
  }>
  link?: string
}

function cleanCnpj(cnpj: string): string {
  return cnpj.replace(/\D/g, '')
}

export async function getReceitaData(cnpj: string): Promise<ReceitaData | null> {
  try {
    // Limpar CNPJ (remover pontos, traços, barras)
    const cleanCnpj = cnpj.replace(/[^\d]/g, '')
    
    // Tentar ReceitaWS primeiro (gratuito)
    const response = await axios.get(`https://receitaws.com.br/v1/cnpj/${cleanCnpj}`, {
      timeout: 10000,
      headers: {
        'User-Agent': 'STRATEVO-Platform/1.0'
      }
    })

    if (response.data && response.data.cnpj) {
      return {
        cnpj: response.data.cnpj,
        razao_social: response.data.nome,
        nome_fantasia: response.data.fantasia,
        natureza_juridica: response.data.natureza_juridica,
        data_abertura: response.data.abertura,
        capital_social: response.data.capital_social,
        porte: response.data.porte,
        situacao: response.data.situacao,
        regime_tributario: response.data.efr || 'Não informado',
        endereco: {
          logradouro: response.data.logradouro,
          numero: response.data.numero,
          complemento: response.data.complemento,
          bairro: response.data.bairro,
          municipio: response.data.municipio,
          uf: response.data.uf,
          cep: response.data.cep,
        },
        telefone: response.data.telefone,
        email: response.data.email,
        quadro_socios: response.data.qsa?.map((socio: any) => ({
          nome: socio.nome,
          qualificacao: socio.qual
        })) || [],
        link: response.data.link ?? undefined
      }
    }

    return null
  } catch (error) {
    console.error('Erro ao consultar Receita Federal:', error)
    
    // Fallback para BrasilAPI
    try {
      const brasilResponse = await axios.get(`https://brasilapi.com.br/api/cnpj/v1/${cleanCnpj(cnpj)}`)
      
      if (brasilResponse.data) {
        return {
          cnpj: brasilResponse.data.cnpj,
          razao_social: brasilResponse.data.razao_social,
          nome_fantasia: brasilResponse.data.nome_fantasia,
          natureza_juridica: brasilResponse.data.natureza_juridica,
          data_abertura: brasilResponse.data.data_inicio_atividade,
          capital_social: brasilResponse.data.capital_social?.toString() || 'Não informado',
          porte: brasilResponse.data.porte?.descricao || 'Não informado',
          situacao: brasilResponse.data.descricao_situacao_cadastral,
          regime_tributario: 'Não informado',
          endereco: {
            logradouro: brasilResponse.data.estabelecimento.logradouro,
            numero: brasilResponse.data.estabelecimento.numero,
            complemento: brasilResponse.data.estabelecimento.complemento,
            bairro: brasilResponse.data.estabelecimento.bairro,
            municipio: brasilResponse.data.estabelecimento.cidade.nome,
            uf: brasilResponse.data.estabelecimento.estado.sigla,
            cep: brasilResponse.data.estabelecimento.cep,
          },
          telefone: brasilResponse.data.estabelecimento.ddd_telefone_1,
          email: brasilResponse.data.estabelecimento.email,
          quadro_socios: brasilResponse.data.socios?.map((socio: any) => ({
            nome: socio.nome,
            qualificacao: socio.qualificacao
          })) || [],
          link: brasilResponse.data.link ?? undefined
        }
      }
    } catch (brasilError) {
      console.error('Erro ao consultar BrasilAPI:', brasilError)
    }
    
    return null
  }
} 
export async function buscarCNPJ(cnpj: string) {
  const cleanCnpj = cnpj.replace(/\D/g, '')
  const res = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cleanCnpj}`)
  if (!res.ok) throw new Error('Erro ao buscar CNPJ')
  return res.json()
} 
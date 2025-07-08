// Exemplo de integração com Engage CRM (pode ser adaptado para Salesforce, HubSpot, etc)
export async function sendLeadToEngageCRM(lead: { name: string, email: string, company: string }) {
  try {
    await fetch('https://api.engagecrm.com/leads', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.ENGAGE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(lead)
    })
  } catch (error) {
    console.error('Erro ao enviar lead para Engage CRM:', error)
  }
} 
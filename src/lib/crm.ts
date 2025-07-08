export async function sendLeadToCRM(lead: { name: string, email: string, company: string }) {
  // Exemplo fictício para Engage CRM
  await fetch('https://api.engagecrm.com/leads', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${process.env.ENGAGE_API_KEY}` },
    body: JSON.stringify(lead)
  })
}

export async function addToMailchimp(email: string, name: string) {
  await fetch('https://usX.api.mailchimp.com/3.0/lists/{list_id}/members', {
    method: 'POST',
    headers: {
      'Authorization': `apikey ${process.env.MAILCHIMP_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email_address: email, status: 'subscribed', merge_fields: { FNAME: name } })
  })
} 
// Exemplo de integração com Mailchimp (pode ser adaptado para SendGrid, Brevo, etc)
export async function addToMailchimp(email: string, name: string) {
  try {
    await fetch('https://usX.api.mailchimp.com/3.0/lists/{list_id}/members', {
      method: 'POST',
      headers: {
        'Authorization': `apikey ${process.env.MAILCHIMP_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email_address: email,
        status: 'subscribed',
        merge_fields: { FNAME: name }
      })
    })
  } catch (error) {
    console.error('Erro ao adicionar contato ao Mailchimp:', error)
  }
} 
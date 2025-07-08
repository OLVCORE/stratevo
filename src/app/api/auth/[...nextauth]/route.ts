import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'
import LinkedInProvider from 'next-auth/providers/linkedin'
import CredentialsProvider from 'next-auth/providers/credentials'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || 'PLACEHOLDER',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'PLACEHOLDER',
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || 'PLACEHOLDER',
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || 'PLACEHOLDER',
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID || 'PLACEHOLDER',
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET || 'PLACEHOLDER',
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "E-mail", type: "email" },
        password: { label: "Senha", type: "password" }
      },
      async authorize(credentials) {
        if (credentials?.email && credentials?.password) {
          // Implemente aqui a lógica real de autenticação
          return { id: '1', name: 'Usuário', email: credentials.email }
        }
        return null
      }
    })
  ],
  pages: {
    signIn: '/auth/signin',
    error: '/auth/signin'
  },
  secret: process.env.NEXTAUTH_SECRET || 'PLACEHOLDER'
})

export { handler as GET, handler as POST } 
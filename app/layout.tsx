import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Fira_Code } from 'next/font/google'
import { SiteHeader } from '@/components/site-header'
import { SidebarLayout } from '@/components/sidebar-layout'
import { AuthProvider } from '@/components/auth-provider'
import './globals.css'

const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

const fontMono = Fira_Code({
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'DevHub — Comandos, setups e stacks para desenvolvedores',
  description:
    'Centralize comandos, documentação rápida e setups de tecnologias. Encontre como iniciar projetos e configurar ambientes em segundos.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0c0f14',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      className={`dark ${fontSans.variable} ${fontMono.variable} bg-background`}
    >
      <body className="min-h-screen font-sans antialiased flex flex-col">
        <AuthProvider>
          <SiteHeader />
          <SidebarLayout>
            {children}
          </SidebarLayout>
        </AuthProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

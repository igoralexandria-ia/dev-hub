import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email || session.user.email !== process.env.ADMIN_EMAIL) {
    redirect('/')
  }

  return (
    <div className="flex min-h-[calc(100vh-140px)] flex-col bg-muted/20">
      <div className="border-b border-border bg-background">
        <div className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-lg font-bold text-foreground">Painel Administrativo</h1>
          <nav className="ml-8 flex space-x-4">
            <a href="/admin/submissoes" className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary">
              Submissões
            </a>
          </nav>
        </div>
      </div>
      <div className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  )
}

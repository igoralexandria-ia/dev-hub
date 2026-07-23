import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { Sparkles } from 'lucide-react'
import { ContributionForm } from '@/components/contribution-form'
import { getTechnologies } from '@/lib/actions'

export const metadata = {
  title: 'Contribuir — DevHub',
}

export default async function ContribuirPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect('/api/auth/signin?callbackUrl=/contribuir')
  }

  const technologies = await getTechnologies()

  return (
    <main className="mx-auto max-w-4xl px-4 pb-24 pt-12 sm:px-6">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
          <Sparkles className="size-8 text-primary" />
          Contribuir com o DevHub
        </h1>
        <p className="mt-2 max-w-2xl text-base text-muted-foreground text-pretty">
          Compartilhe aquele comando mágico que você usa sempre ou um tutorial de setup de uma nova stack. A comunidade agradece!
        </p>
      </div>

      <ContributionForm technologies={technologies} />
    </main>
  )
}

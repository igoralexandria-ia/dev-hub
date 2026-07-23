import { getPendingSubmissions, getTechnologies } from '@/lib/actions'
import { SubmissionList } from '@/components/admin/submission-list'
import { Inbox } from 'lucide-react'

export const metadata = {
  title: 'Submissões — Admin',
}

export default async function SubmissoesPage() {
  const submissions = await getPendingSubmissions()
  const technologies = await getTechnologies()

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Inbox className="size-6 text-primary" />
          Fila de Moderação
        </h2>
        <p className="text-muted-foreground mt-1">
          Analise, ajuste e aprove as sugestões enviadas pela comunidade.
        </p>
      </div>

      <SubmissionList submissions={submissions} technologies={technologies} />
    </div>
  )
}

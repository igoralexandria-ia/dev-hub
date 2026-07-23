'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Check, X, Terminal, Code2 } from 'lucide-react'
import { rejectSubmission } from '@/lib/actions'
import { ApproveModal } from './approve-modal'
import { ConfirmModal } from '@/components/ui/confirm-modal'
import { Button } from '@/components/ui/button'
import type { Technology } from '@/types/models'

interface SubmissionListProps {
  submissions: any[]
  technologies: Technology[]
}

export function SubmissionList({ submissions, technologies }: SubmissionListProps) {
  const router = useRouter()
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null)
  
  const [rejectId, setRejectId] = useState<string | null>(null)
  const [isRejecting, setIsRejecting] = useState(false)

  async function handleConfirmReject() {
    if (!rejectId) return
    
    setIsRejecting(true)
    await rejectSubmission(rejectId)
    setIsRejecting(false)
    setRejectId(null)
    router.refresh()
  }

  if (submissions.length === 0) {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/50 text-center">
        <Check className="mb-4 size-10 text-emerald-500/50" />
        <h3 className="text-lg font-medium">Tudo limpo por aqui!</h3>
        <p className="text-sm text-muted-foreground">Não há sugestões pendentes no momento.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {submissions.map(sub => (
        <div key={sub.id} className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                {sub.type === 'command' ? <Terminal className="size-3" /> : <Code2 className="size-3" />}
                {sub.type}
              </span>
              <span className="text-xs text-muted-foreground">
                Por: {sub.user.name || sub.user.email}
              </span>
              <span className="text-xs text-muted-foreground">
                • {new Date(sub.createdAt).toLocaleDateString('pt-BR')}
              </span>
            </div>
            
            <div>
              <h4 className="font-bold text-foreground">{sub.title}</h4>
              <p className="mt-1 font-mono text-sm text-muted-foreground bg-muted/50 p-2 rounded-md border border-border/50">
                {sub.content}
              </p>
              {sub.description && (
                <p className="mt-2 text-sm text-muted-foreground">{sub.description}</p>
              )}
            </div>
            
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-muted-foreground">
              <span>Tecnologia:</span>
              <span className="rounded bg-secondary px-2 py-0.5">
                {sub.techId ? technologies.find(t => t.id === sub.techId)?.name : `Outro (${sub.otherTech})`}
              </span>
            </div>
          </div>
          
          <div className="flex shrink-0 items-center gap-2 sm:flex-col sm:items-stretch">
            <Button
              variant="success"
              onClick={() => setSelectedSubmission(sub)}
              className="gap-2 px-4 py-2"
            >
              <Check className="size-4" />
              Aprovar
            </Button>
            <Button
              variant="danger"
              onClick={() => setRejectId(sub.id)}
              className="gap-2 px-4 py-2"
            >
              <X className="size-4" />
              Rejeitar
            </Button>
          </div>
        </div>
      ))}

      {selectedSubmission && (
        <ApproveModal 
          submission={selectedSubmission} 
          technologies={technologies}
          onClose={() => setSelectedSubmission(null)}
          onSuccess={() => {
            setSelectedSubmission(null)
            router.refresh()
          }}
        />
      )}

      {rejectId && (
        <ConfirmModal 
          title="Rejeitar Submissão"
          description="Tem certeza que deseja rejeitar e apagar permanentemente esta submissão? Esta ação não pode ser desfeita."
          confirmText="Sim, Rejeitar"
          cancelText="Cancelar"
          type="danger"
          isLoading={isRejecting}
          onConfirm={handleConfirmReject}
          onCancel={() => !isRejecting && setRejectId(null)}
        />
      )}
    </div>
  )
}

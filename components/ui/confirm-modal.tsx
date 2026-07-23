'use client'

import { AlertCircle, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export interface ConfirmModalProps {
  title: string
  description: string
  confirmText?: string
  cancelText?: string
  onConfirm: () => void
  onCancel: () => void
  isLoading?: boolean
  type?: 'danger' | 'warning' | 'info'
}

export function ConfirmModal({
  title,
  description,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  onConfirm,
  onCancel,
  isLoading = false,
  type = 'danger'
}: ConfirmModalProps) {
  
  const isDanger = type === 'danger'
  
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-xl animate-in zoom-in-95">
        <div className="flex items-start gap-4">
          <div className={`mt-0.5 shrink-0 rounded-full p-2 ${isDanger ? 'bg-red-500/10 text-red-500' : 'bg-amber-500/10 text-amber-500'}`}>
            <AlertCircle className="size-6" />
          </div>
          <div className="flex-1 space-y-2">
            <h3 className="text-lg font-bold leading-none tracking-tight">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
        
        <div className="mt-8 flex justify-end gap-3">
          <Button 
            variant="outline" 
            onClick={onCancel}
            disabled={isLoading}
          >
            {cancelText}
          </Button>
          <Button 
            variant={isDanger ? 'danger' : 'default'}
            onClick={onConfirm}
            isLoading={isLoading}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  )
}

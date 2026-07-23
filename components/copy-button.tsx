'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { cn } from '@/lib/utils'

import { incrementCommandCopyCount } from '@/lib/actions'

export function CopyButton({
  value,
  commandId,
  className,
}: {
  value: string
  commandId?: string
  className?: string
}) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      
      if (commandId) {
        incrementCommandCopyCount(commandId).catch(() => {})
      }
      
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // ignore clipboard errors
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label="Copiar comando"
      className={cn(
        'cursor-pointer flex size-8 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:text-foreground',
        copied && 'border-primary/40 text-primary',
        className,
      )}
    >
      {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
    </button>
  )
}

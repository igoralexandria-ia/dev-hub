'use client'

import { useState, useEffect } from 'react'
import { X, Terminal, Code, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { cn } from '@/lib/utils'
import type { Technology, CommandWithTech, StackStep } from '@/types/models'

interface TechCommandsModalProps {
  isOpen: boolean
  onClose: () => void
  tech: Technology | null
  commands: CommandWithTech[]
  onConfirm: (steps: StackStep[]) => void
  initialSelectedSteps?: StackStep[]
}

export function TechCommandsModal({ 
  isOpen, 
  onClose, 
  tech, 
  commands, 
  onConfirm,
  initialSelectedSteps = []
}: TechCommandsModalProps) {
  
  const [selectedMap, setSelectedMap] = useState<Record<string, { selected: boolean, os?: string, rawCommand: string }>>({})

  useEffect(() => {
    if (isOpen && tech) {
      const initialMap: Record<string, { selected: boolean, os?: string, rawCommand: string }> = {}
      commands.forEach(cmd => {
        let isOsSpecific = false
        if (typeof cmd.command === 'object' && cmd.command !== null) {
          isOsSpecific = true
        }

        const matchedStep = initialSelectedSteps.find(s => s.title === cmd.label)
        
        initialMap[cmd.id] = {
          selected: !!matchedStep,
          os: isOsSpecific ? 'default' : undefined,
          rawCommand: ''
        }
      })
      setSelectedMap(initialMap)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => { document.body.style.overflow = 'unset' }
  }, [isOpen, tech, commands, initialSelectedSteps])

  if (!isOpen || !tech) return null

  function getCommandString(cmd: CommandWithTech, os?: string) {
    if (typeof cmd.command === 'string') return cmd.command
    if (!cmd.command) return ''
    
    if (os && (cmd.command as any)[os]) {
      return (cmd.command as any)[os]
    }
    return (cmd.command as any).default || ''
  }

  function handleToggle(cmdId: string) {
    setSelectedMap(prev => ({
      ...prev,
      [cmdId]: {
        ...prev[cmdId],
        selected: !prev[cmdId].selected
      }
    }))
  }

  function handleOsChange(cmdId: string, os: string) {
    setSelectedMap(prev => ({
      ...prev,
      [cmdId]: {
        ...prev[cmdId],
        os
      }
    }))
  }

  function handleConfirm() {
    const steps: StackStep[] = []
    
    commands.forEach(cmd => {
      const config = selectedMap[cmd.id]
      if (config && config.selected) {
        steps.push({
          title: cmd.label,
          description: cmd.description,
          command: getCommandString(cmd, config.os)
        })
      }
    })
    
    onConfirm(steps)
  }

  const selectedCount = Object.values(selectedMap).filter(v => v.selected).length

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity animate-in fade-in" 
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-2xl rounded-2xl border border-border bg-card p-6 shadow-2xl animate-in zoom-in-95 fade-in flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="mb-6 flex items-center justify-between border-b border-border/50 pb-4 shrink-0">
          <div className="flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 p-2 border border-primary/20">
              {tech.iconUrl ? (
                <img src={tech.iconUrl} alt={tech.name} className="w-full h-full object-contain" />
              ) : (
                <span className="font-mono text-sm font-bold text-primary">{tech.name.slice(0, 2).toUpperCase()}</span>
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-foreground">
                Comandos de {tech.name}
              </h2>
              <p className="text-sm text-muted-foreground">
                Selecione os comandos que deseja adicionar ao gerador.
              </p>
            </div>
          </div>
          
          <button 
            onClick={onClose}
            className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto pr-2 space-y-4 min-h-0">
          {commands.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Terminal className="size-10 text-muted-foreground/30 mb-3" />
              <p className="text-sm text-muted-foreground">Esta tecnologia ainda não possui comandos registrados.</p>
            </div>
          ) : (
            commands.map(cmd => {
              const config = selectedMap[cmd.id] || { selected: false }
              const isOsSpecific = typeof cmd.command === 'object' && cmd.command !== null
              const isSelected = config.selected

              return (
                <div 
                  key={cmd.id} 
                  className={cn(
                    "flex flex-col gap-3 rounded-xl border p-4 transition-all duration-200",
                    isSelected ? "border-primary bg-primary/5 shadow-sm" : "border-border hover:border-primary/30"
                  )}
                >
                  <div className="flex items-start gap-4">
                    <button 
                      onClick={() => handleToggle(cmd.id)}
                      className={cn(
                        "mt-1 flex size-5 shrink-0 items-center justify-center rounded border transition-colors cursor-pointer",
                        isSelected ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground/30 hover:border-primary/50"
                      )}
                    >
                      {isSelected && <Check className="size-3.5" strokeWidth={3} />}
                    </button>
                    
                    <div className="flex-1 space-y-1">
                      <h3 className="font-semibold text-foreground cursor-pointer" onClick={() => handleToggle(cmd.id)}>{cmd.label}</h3>
                      <p className="text-sm text-muted-foreground text-pretty line-clamp-2">{cmd.description}</p>
                    </div>

                    {isOsSpecific && isSelected && (
                      <div className="shrink-0 w-32 animate-in fade-in">
                        <Select 
                          value={config.os || 'default'}
                          onChange={e => handleOsChange(cmd.id, e.target.value)}
                          className="h-8 text-xs bg-background [&_option]:bg-background [&_option]:text-foreground"
                        >
                          <option value="default">Padrão</option>
                          {(cmd.command as any).windows && <option value="windows">Windows</option>}
                          {(cmd.command as any).mac && <option value="mac">Mac</option>}
                          {(cmd.command as any).linux && <option value="linux">Linux</option>}
                        </Select>
                      </div>
                    )}
                  </div>
                  
                  {isSelected && (
                    <div className="ml-9 animate-in fade-in slide-in-from-top-2">
                      <code className="block rounded-lg bg-card border border-border p-3 text-xs font-mono text-muted-foreground break-all">
                        {getCommandString(cmd, config.os)}
                      </code>
                    </div>
                  )}
                </div>
              )
            })
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between shrink-0">
          <span className="text-sm text-muted-foreground font-medium">
            {selectedCount} {selectedCount === 1 ? 'comando selecionado' : 'comandos selecionados'}
          </span>
          <div className="flex gap-3">
            <Button variant="ghost" onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={handleConfirm}>
              <Code className="size-4 mr-2" />
              Adicionar ao Setup
            </Button>
          </div>
        </div>
        
      </div>
    </div>
  )
}

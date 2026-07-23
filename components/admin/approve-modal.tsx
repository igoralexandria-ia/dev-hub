'use client'

import { useState, useEffect } from 'react'
import { CheckCircle2, XCircle, Terminal, Info, Tag, Plus, Trash2 } from 'lucide-react'
import { approveCommandSubmission } from '@/lib/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import type { Technology } from '@/types/models'

interface ApproveModalProps {
  submission: any
  technologies: Technology[]
  onClose: () => void
  onSuccess: () => void
}

export function ApproveModal({ submission, technologies, onClose, onSuccess }: ApproveModalProps) {
  const [techId, setTechId] = useState(submission.techId || '')
  const [commandId, setCommandId] = useState(submission.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''))
  const [label, setLabel] = useState(submission.title)
  const [description, setDescription] = useState(submission.description || '')
  
  const [isOsSpecific, setIsOsSpecific] = useState(false)
  const [defaultCommand, setDefaultCommand] = useState('')
  const [winCommand, setWinCommand] = useState('')
  const [macCommand, setMacCommand] = useState('')
  const [linCommand, setLinCommand] = useState('')

  const [whenToUse, setWhenToUse] = useState('')
  const [hasExample, setHasExample] = useState(true)
  const [example, setExample] = useState('')
  const [options, setOptions] = useState<{flag: string, description: string}[]>([])
  
  const [tagsInput, setTagsInput] = useState('')

  useEffect(() => {
    try {
      const parsed = JSON.parse(submission.content)
      if (parsed && typeof parsed === 'object') {
        if ('command' in parsed) {
          if (typeof parsed.command === 'object' && parsed.command !== null) {
            setIsOsSpecific(true)
            setDefaultCommand(parsed.command.default || '')
            setWinCommand(parsed.command.windows || '')
            setMacCommand(parsed.command.mac || '')
            setLinCommand(parsed.command.linux || '')
          } else {
            setDefaultCommand(parsed.command || '')
          }
          
          if (parsed.whenToUse) setWhenToUse(parsed.whenToUse)
          
          if (parsed.example) {
            setHasExample(true)
            setExample(parsed.example)
          } else {
            setHasExample(false)
          }
          
          if (parsed.options && Array.isArray(parsed.options)) {
            setOptions(parsed.options)
          }
        } else if ('default' in parsed || 'windows' in parsed) {
          setIsOsSpecific(true)
          setDefaultCommand(parsed.default || '')
          setWinCommand(parsed.windows || '')
          setMacCommand(parsed.mac || '')
          setLinCommand(parsed.linux || '')
        } else {
          setDefaultCommand(submission.content)
        }
      } else {
        setDefaultCommand(submission.content)
      }
    } catch {
      setDefaultCommand(submission.content)
    }
  }, [submission.content])
  
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  function addOption() {
    setOptions([...options, { flag: '', description: '' }])
  }

  function updateOption(index: number, field: 'flag' | 'description', value: string) {
    const newOptions = [...options]
    newOptions[index][field] = value
    setOptions(newOptions)
  }

  function removeOption(index: number) {
    setOptions(options.filter((_, i) => i !== index))
  }

  async function handleApprove(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const tags = tagsInput.split(',').map(t => t.trim()).filter(Boolean)
      
      let finalCommand: any = defaultCommand
      if (isOsSpecific) {
        finalCommand = {
          default: defaultCommand || winCommand || macCommand || linCommand,
          windows: winCommand || undefined,
          mac: macCommand || undefined,
          linux: linCommand || undefined
        }
      }
      
      const finalOptions = options.filter(o => o.flag.trim() && o.description.trim())
      
      const result = await approveCommandSubmission({
        submissionId: submission.id,
        techId,
        commandId,
        label,
        command: JSON.stringify(finalCommand),
        description,
        whenToUse,
        example: hasExample ? example : undefined,
        options: finalOptions.length > 0 ? finalOptions : undefined,
        tags
      })
      
      if (result.error) {
        setError(result.error)
      } else {
        onSuccess()
      }
    } catch (err) {
      setError('Erro ao aprovar submissão')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl rounded-xl border border-border bg-card p-6 shadow-xl overflow-y-auto max-h-[90vh]">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <CheckCircle2 className="size-5 text-emerald-500" />
            Aprovar Comando
          </h2>
          <button onClick={onClose} className="rounded-full p-2 hover:bg-muted cursor-pointer">
            <XCircle className="size-5 text-muted-foreground" />
          </button>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-red-500/10 p-3 text-sm text-red-500 border border-red-500/20">
            {error}
          </div>
        )}

        <form onSubmit={handleApprove} className="space-y-5">
          
          <div className="grid grid-cols-2 gap-4">
            <Select 
              label={<>Tecnologia (ID) <span className="text-red-500">*</span></>}
              value={techId}
              onChange={e => setTechId(e.target.value)}
              required
            >
              <option value="">Selecione...</option>
              {technologies.map(tech => (
                <option key={tech.id || tech.slug} value={tech.id || tech.slug}>{tech.name}</option>
              ))}
            </Select>
            
            <Input 
              label={<span className="flex items-center gap-1"><Tag className="size-3" /> Command Slug (ID) <span className="text-red-500">*</span></span>}
              type="text" 
              value={commandId}
              onChange={e => setCommandId(e.target.value)}
              required
            />
          </div>

          <Input 
            label={<>1. Título / Nome <span className="text-red-500">*</span></>}
            type="text" 
            value={label}
            onChange={e => setLabel(e.target.value)}
            required
          />

          <Textarea 
            label={<>2. O que faz (Descrição) <span className="text-red-500">*</span></>}
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={2}
            required
          />

          <div className="space-y-4 rounded-lg border border-border bg-muted/20 p-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <Terminal className="size-4" />
                3. Bloco do terminal ou S.O. <span className="text-red-500">*</span>
              </label>
              <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={isOsSpecific}
                  onChange={e => setIsOsSpecific(e.target.checked)}
                  className="rounded border-input bg-background text-primary focus:ring-primary size-3.5"
                />
                Varia por S.O.?
              </label>
            </div>
            
            {!isOsSpecific ? (
              <Textarea 
                rows={3}
                value={defaultCommand}
                onChange={e => setDefaultCommand(e.target.value)}
                className="font-mono"
                required
              />
            ) : (
              <div className="space-y-4">
                <Textarea 
                  label={<span className="text-xs">Windows</span>}
                  rows={2}
                  value={winCommand}
                  onChange={e => setWinCommand(e.target.value)}
                  className="font-mono min-h-[60px]"
                />
                <Textarea 
                  label={<span className="text-xs">Mac</span>}
                  rows={2}
                  value={macCommand}
                  onChange={e => setMacCommand(e.target.value)}
                  className="font-mono min-h-[60px]"
                />
                <Textarea 
                  label={<span className="text-xs">Linux</span>}
                  rows={2}
                  value={linCommand}
                  onChange={e => setLinCommand(e.target.value)}
                  className="font-mono min-h-[60px]"
                />
                <div className="pt-2 border-t border-border/50">
                   <Textarea 
                    label={<span className="text-xs">Comando Padrão (Fallback) <span className="text-red-500">*</span></span>}
                    rows={2}
                    value={defaultCommand}
                    onChange={e => setDefaultCommand(e.target.value)}
                    className="font-mono min-h-[60px]"
                    required
                  />
                </div>
              </div>
            )}
          </div>

          <Input 
            label={<span className="flex items-center gap-1"><Info className="size-3" /> 4. Quando usar? <span className="text-red-500">*</span></span>}
            type="text" 
            value={whenToUse}
            onChange={e => setWhenToUse(e.target.value)}
            placeholder="Ex: Use isso para desfazer alterações locais..."
            required
          />

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">
                5. Exemplo {!hasExample ? '' : <span className="text-red-500">*</span>}
              </label>
              <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={!hasExample}
                  onChange={e => setHasExample(!e.target.checked)}
                  className="rounded border-input bg-background text-primary focus:ring-primary size-3.5"
                />
                Não tem exemplo
              </label>
            </div>
            {hasExample && (
              <Input 
                type="text" 
                placeholder="Ex: git clone https://github.com/facebook/react.git"
                value={example}
                onChange={e => setExample(e.target.value)}
                className="font-mono text-sm"
                required
              />
            )}
          </div>
          
          <div className="space-y-3 rounded-lg border border-border bg-muted/10 p-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">
                6. Parâmetros Adicionais <span className="text-muted-foreground font-normal">(opcional)</span>
              </label>
              <Button type="button" variant="outline" size="sm" onClick={addOption}>
                <Plus className="size-3.5 mr-1" /> Adicionar
              </Button>
            </div>
            
            {options.length > 0 && (
              <div className="space-y-3 mt-4">
                {options.map((opt, idx) => (
                  <div key={idx} className="flex items-start gap-3 animate-in fade-in">
                    <div className="flex-1 space-y-2">
                      <Input 
                        placeholder="Flag (ex: -f)" 
                        value={opt.flag} 
                        onChange={e => updateOption(idx, 'flag', e.target.value)} 
                        className="font-mono text-xs"
                      />
                    </div>
                    <div className="flex-[2] space-y-2">
                      <Input 
                        placeholder="Descrição..." 
                        value={opt.description} 
                        onChange={e => updateOption(idx, 'description', e.target.value)} 
                      />
                    </div>
                    <Button type="button" variant="ghost" size="icon" className="text-muted-foreground hover:text-red-500" onClick={() => removeOption(idx)}>
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Input 
            label="Tags (separadas por vírgula)"
            type="text" 
            value={tagsInput}
            onChange={e => setTagsInput(e.target.value)}
            placeholder="Ex: git, reset, hard"
          />

          <div className="pt-4 flex justify-end gap-3">
            <Button 
              type="button" 
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button 
              type="submit" 
              variant="success"
              isLoading={isLoading}
            >
              Salvar e Publicar
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

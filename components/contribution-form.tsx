'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Terminal, Sparkles, CheckCircle2, AlertCircle, Plus, Trash2 } from 'lucide-react'
import { submitContribution } from '@/lib/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import type { Technology } from '@/types/models'

export function ContributionForm({ technologies }: { technologies: Technology[] }) {
  const router = useRouter()
  
  const [type, setType] = useState('command')
  const [techId, setTechId] = useState('')
  const [otherTech, setOtherTech] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  
  const [isOsSpecific, setIsOsSpecific] = useState(false)
  const [defaultCommand, setDefaultCommand] = useState('')
  const [winCommand, setWinCommand] = useState('')
  const [macCommand, setMacCommand] = useState('')
  const [linCommand, setLinCommand] = useState('')
  
  const [whenToUse, setWhenToUse] = useState('')
  const [hasExample, setHasExample] = useState(true)
  const [example, setExample] = useState('')
  const [options, setOptions] = useState<{flag: string, description: string}[]>([])

  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error' | 'warning'} | null>(null)

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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    if (!type) return showToast('Selecione o que você quer enviar.', 'warning')
    if (!techId) return showToast('Selecione uma tecnologia.', 'warning')
    if (techId === 'outro' && (!otherTech || otherTech.trim().length < 2)) {
      return showToast('Especifique qual é a outra tecnologia (mín. 2 caracteres).', 'warning')
    }
    if (!title || title.trim().length < 5) return showToast('O título deve ter pelo menos 5 caracteres.', 'warning')
    if (type === 'command' && (!description || description.trim().length < 10)) {
      return showToast('A descrição deve ter pelo menos 10 caracteres.', 'warning')
    }
    
    if (isOsSpecific) {
      if (!winCommand && !macCommand && !linCommand && !defaultCommand) {
        return showToast('Preencha ao menos o comando de um sistema operacional.', 'warning')
      }
    } else {
      if (!defaultCommand || defaultCommand.trim().length < 5) return showToast('O código/comando deve ter pelo menos 5 caracteres.', 'warning')
    }
    
    if (type === 'command') {
      if (!whenToUse || whenToUse.trim().length < 10) return showToast('Explique quando usar (mínimo 10 caracteres).', 'warning')
      if (hasExample && (!example || example.trim().length < 5)) return showToast('Forneça um exemplo válido ou marque que não possui exemplo.', 'warning')
    }
    
    setIsLoading(true)
    
    try {
      let finalContent = ''
      
      if (type === 'command') {
        const cmdPayload = {
          command: isOsSpecific ? {
            default: defaultCommand.trim() || winCommand.trim() || macCommand.trim() || linCommand.trim(), // fallback 
            windows: winCommand.trim() || undefined,
            mac: macCommand.trim() || undefined,
            linux: linCommand.trim() || undefined
          } : defaultCommand.trim(),
          whenToUse: whenToUse.trim(),
          example: hasExample ? example.trim() : null,
          options: options.filter(o => o.flag.trim() && o.description.trim())
        }
        finalContent = JSON.stringify(cmdPayload)
      } else {
        finalContent = isOsSpecific ? JSON.stringify({
          default: defaultCommand.trim() || winCommand.trim() || macCommand.trim() || linCommand.trim(),
          windows: winCommand.trim() || undefined,
          mac: macCommand.trim() || undefined,
          linux: linCommand.trim() || undefined
        }) : defaultCommand.trim()
      }

      const result = await submitContribution({
        type,
        techId: techId === 'outro' ? undefined : techId,
        otherTech: techId === 'outro' ? otherTech.trim() : undefined,
        title: title.trim(),
        content: finalContent,
        description: description.trim() || undefined
      })
      
      if (result?.error) {
        showToast(result.error, 'error')
      } else {
        showToast('Sugestão enviada com sucesso! Muito obrigado.', 'success')
        setSuccess(true)
        setType('command')
        setTechId('')
        setOtherTech('')
        setTitle('')
        setDefaultCommand('')
        setWinCommand('')
        setMacCommand('')
        setLinCommand('')
        setIsOsSpecific(false)
        setDescription('')
        setWhenToUse('')
        setHasExample(true)
        setExample('')
        setOptions([])
      }
    } catch (err) {
      showToast('Ocorreu um erro ao enviar sua sugestão. Tente novamente.', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  function showToast(message: string, type: 'success' | 'error' | 'warning') {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm relative">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed bottom-4 right-4 z-50 flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium shadow-xl transition-all animate-in slide-in-from-bottom-5 fade-in ${
          toast.type === 'error' ? 'bg-red-500/90 text-white border border-red-500' :
          toast.type === 'success' ? 'bg-emerald-500/90 text-white border border-emerald-500' :
          'bg-amber-500/90 text-white border border-amber-500'
        }`}>
          {toast.type === 'error' && <AlertCircle className="size-5" />}
          {toast.type === 'success' && <CheckCircle2 className="size-5" />}
          {toast.type === 'warning' && <AlertCircle className="size-5" />}
          <p>{toast.message}</p>
        </div>
      )}

      {success ? (
        <div className="flex flex-col items-center justify-center py-12 text-center space-y-4 animate-in fade-in zoom-in">
          <div className="size-16 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500">
            <CheckCircle2 className="size-8" />
          </div>
          <h3 className="text-xl font-semibold">Sugestão enviada!</h3>
          <p className="text-muted-foreground max-w-sm">Obrigado por contribuir. Sua sugestão passará por uma revisão antes de ser publicada.</p>
          <Button 
            onClick={() => setSuccess(false)}
            variant="secondary"
            className="px-6"
          >
            Enviar outra sugestão
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <Select
            label={<>O que você quer enviar? <span className="text-red-500">*</span></>}
            value={type}
            onChange={e => setType(e.target.value)}
            required
          >
            <option value="command">Um Novo Comando</option>
            <option value="tutorial">Um Tutorial de Setup</option>
            <option value="technology">Sugerir Nova Tecnologia</option>
          </Select>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Select 
                label={<>Tecnologia relacionada <span className="text-red-500">*</span></>}
                value={techId}
                onChange={e => setTechId(e.target.value)}
                required
              >
                <option value="">Selecione...</option>
                {technologies.map(tech => (
                  <option key={tech.id || tech.slug} value={tech.id || tech.slug}>{tech.name}</option>
                ))}
                <option value="outro">Outro...</option>
              </Select>
              
              {techId === 'outro' && (
                <div className="pt-2 animate-in fade-in slide-in-from-top-1">
                  <Input 
                    type="text" 
                    placeholder="Qual tecnologia?"
                    value={otherTech}
                    onChange={e => setOtherTech(e.target.value)}
                    maxLength={30}
                    className="border-primary/50 bg-primary/5 focus-visible:ring-primary/50"
                    required
                  />
                  <p className="mt-1 text-[10px] text-muted-foreground text-right">{otherTech.length}/30</p>
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <Input 
                label={<>1. Título / Nome <span className="text-red-500">*</span></>}
                type="text" 
                placeholder="Ex: Clonar Repositório"
                value={title}
                onChange={e => setTitle(e.target.value)}
                maxLength={80}
                required
              />
              <p className="mt-1 text-[10px] text-muted-foreground text-right">{title.length}/80</p>
            </div>
          </div>

          <Textarea 
            label={<>2. O que faz (Descrição) <span className="text-red-500">*</span></>}
            rows={2}
            placeholder="Ex: Baixa um repositório remoto para a sua máquina local."
            value={description}
            onChange={e => setDescription(e.target.value)}
            maxLength={250}
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
            <p className="text-xs text-muted-foreground -mt-2">Use &lt;nome-variavel&gt; para criar campos dinâmicos no comando.</p>
            
            {!isOsSpecific ? (
              <Textarea 
                rows={3}
                placeholder="Ex: git clone https://github.com/..."
                value={defaultCommand}
                onChange={e => setDefaultCommand(e.target.value)}
                maxLength={500}
                className="font-mono"
                required
              />
            ) : (
              <div className="space-y-4 animate-in fade-in slide-in-from-top-1">
                <Textarea 
                  label={<span className="text-xs">Windows</span>}
                  rows={2}
                  placeholder="Comando para Windows..."
                  value={winCommand}
                  onChange={e => setWinCommand(e.target.value)}
                  maxLength={500}
                  className="font-mono min-h-[60px]"
                />
                <Textarea 
                  label={<span className="text-xs">Mac</span>}
                  rows={2}
                  placeholder="Comando para Mac..."
                  value={macCommand}
                  onChange={e => setMacCommand(e.target.value)}
                  maxLength={500}
                  className="font-mono min-h-[60px]"
                />
                <Textarea 
                  label={<span className="text-xs">Linux</span>}
                  rows={2}
                  placeholder="Comando para Linux..."
                  value={linCommand}
                  onChange={e => setLinCommand(e.target.value)}
                  maxLength={500}
                  className="font-mono min-h-[60px]"
                />
                <div className="pt-2 border-t border-border/50">
                   <Textarea 
                    label={<span className="text-xs">Comando Padrão (Fallback) *</span>}
                    rows={2}
                    placeholder="Usado caso o SO não seja detectado..."
                    value={defaultCommand}
                    onChange={e => setDefaultCommand(e.target.value)}
                    maxLength={500}
                    className="font-mono min-h-[60px]"
                    required
                  />
                </div>
              </div>
            )}
          </div>

          {type === 'command' && (
            <>
              <Input 
                label={<>4. Quando usar <span className="text-red-500">*</span></>}
                type="text" 
                placeholder="Ex: Quando você quer trabalhar em um projeto que já existe online."
                value={whenToUse}
                onChange={e => setWhenToUse(e.target.value)}
                maxLength={150}
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
                    maxLength={250}
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
                            placeholder="Flag (ex: -f, --force)" 
                            value={opt.flag} 
                            onChange={e => updateOption(idx, 'flag', e.target.value)} 
                            className="font-mono text-xs"
                          />
                        </div>
                        <div className="flex-[2] space-y-2">
                          <Input 
                            placeholder="Descrição do parâmetro..." 
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
            </>
          )}

          <div className="pt-4 flex justify-end">
            <Button 
              type="submit" 
              isLoading={isLoading}
              className="px-6"
            >
              <Sparkles className="size-4" />
              Enviar Sugestão
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}

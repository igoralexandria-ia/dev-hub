import * as React from "react"
import { cn } from "@/lib/utils"

export interface TextareaProps extends React.ComponentProps<"textarea"> {
  label?: React.ReactNode
}

function Textarea({ className, label, maxLength, value, ...props }: TextareaProps) {
  const [length, setLength] = React.useState(
    typeof value === 'string' ? value.length : 
    typeof props.defaultValue === 'string' ? props.defaultValue.length : 0
  )

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLength(e.target.value.length)
    if (props.onChange) {
      props.onChange(e)
    }
  }

  React.useEffect(() => {
    if (typeof value === 'string') {
      setLength(value.length)
    }
  }, [value])

  const textareaEl = (
    <div className="relative">
      <textarea
        value={value}
        className={cn(
          "flex min-h-[80px] w-full rounded-lg border border-input bg-transparent px-3 py-2 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary/50 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        maxLength={maxLength}
        onChange={handleChange}
        {...props}
      />
      {maxLength && (
        <div className="absolute -bottom-5 right-0 text-[10px] text-muted-foreground">
          {length}/{maxLength}
        </div>
      )}
    </div>
  )

  if (!label) return <div className={maxLength ? "pb-5" : ""}>{textareaEl}</div>

  return (
    <div className={cn("space-y-2", maxLength && "pb-5")}>
      <label className="text-sm font-medium text-foreground">{label}</label>
      {textareaEl}
    </div>
  )
}

export { Textarea }

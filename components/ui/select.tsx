import * as React from "react"
import { cn } from "@/lib/utils"

export interface SelectProps extends React.ComponentProps<"select"> {
  label?: React.ReactNode
}

function Select({ className, label, children, ...props }: SelectProps) {
  const selectEl = (
    <select
      className={cn(
        "h-10 w-full rounded-lg border border-input bg-transparent px-3 py-2 text-base transition-colors outline-none focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary/50 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm appearance-none [&_option]:bg-background [&_option]:text-foreground",
        className
      )}
      {...props}
    >
      {children}
    </select>
  )

  if (!label) {
    return (
      <div className="relative">
        {selectEl}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">{label}</label>
      <div className="relative">
        {selectEl}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
        </div>
      </div>
    </div>
  )
}

export { Select }

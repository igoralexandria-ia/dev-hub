'use client'

import { useState } from 'react'
import { Menu, X, ChevronRight, LayoutDashboard, Terminal, Compass } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { technologies } from '@/lib/data'
import { cn } from '@/lib/utils'
import { UserProfile } from './user-profile'
import { SiteFooter } from '@/components/site-footer'

export function SidebarLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  // Agrupar tecnologias por categoria para a sidebar
  const categories = technologies.reduce((acc, tech) => {
    if (!acc[tech.category]) acc[tech.category] = []
    acc[tech.category].push(tech)
    return acc
  }, {} as Record<string, typeof technologies>)

  return (
    <div className="flex flex-1 relative">
      {/* Overlay para mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={cn(
          "fixed lg:sticky top-14 left-0 z-50 h-[calc(100vh-3.5rem)] flex-shrink-0 transition-all duration-300 ease-in-out border-r border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
          isOpen ? "w-64 translate-x-0" : "w-64 -translate-x-full lg:w-0 lg:-translate-x-0 lg:border-none opacity-0 lg:opacity-100"
        )}
      >
        <div className={cn(
          "h-full overflow-y-auto py-6 px-4 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 lg:hidden"
        )}>
          <div className="space-y-6">
            <div className="space-y-1">
              <Link 
                href="/"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors cursor-pointer",
                  pathname === '/' ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <LayoutDashboard className="size-4" />
                Dashboard
              </Link>
              <Link 
                href="/gerador"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors cursor-pointer",
                  pathname === '/gerador' ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <Terminal className="size-4" />
                Gerador de Setup
              </Link>
              <Link 
                href="/tecnologias"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors cursor-pointer",
                  pathname === '/tecnologias' ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <Compass className="size-4" />
                Explorar Tudo
              </Link>
            </div>

            {Object.entries(categories).map(([category, techs]) => (
              <div key={category} className="space-y-2">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70 px-3">
                  {category}
                </h4>
                <div className="space-y-1">
                  {techs.map(tech => (
                    <Link
                      key={tech.slug}
                      href={`/tecnologias/${tech.slug}`}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors cursor-pointer",
                        pathname === `/tecnologias/${tech.slug}` ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      )}
                    >
                      {tech.iconUrl ? (
                        <img src={tech.iconUrl} alt="" className="size-4 object-contain opacity-80" />
                      ) : (
                        <span className="size-4 flex items-center justify-center rounded-sm text-[8px] font-mono font-bold bg-white/10">
                          {tech.name.slice(0, 1)}
                        </span>
                      )}
                      {tech.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 pt-6 border-t border-border/50">
            <UserProfile />
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
        <div className="sticky top-14 z-30 flex items-center px-4 py-2 bg-background/80 backdrop-blur-sm border-b border-border/50 lg:hidden">
           <button
             onClick={() => setIsOpen(true)}
             className="flex items-center justify-center size-8 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 cursor-pointer"
           >
             <Menu className="size-4" />
           </button>
        </div>
        
        {/* Toggle Button for Desktop */}
        <div className="hidden lg:flex fixed top-[4.5rem] left-0 z-50 transition-transform duration-300"
             style={{ transform: isOpen ? 'translateX(16rem)' : 'translateX(0)' }}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-center h-8 w-6 bg-secondary/80 hover:bg-secondary text-muted-foreground hover:text-foreground rounded-r-md border border-l-0 border-border/50 backdrop-blur cursor-pointer shadow-sm transition-colors"
          >
            {isOpen ? <X className="size-3" /> : <ChevronRight className="size-3" />}
          </button>
        </div>

        <main className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </div>
    </div>
  )
}

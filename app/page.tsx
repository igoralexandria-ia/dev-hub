import { DashboardClient } from '@/components/dashboard-client'
import { getTechnologies, getStacks, getAllCommandsWithTech } from '@/lib/actions'

export default async function DashboardPage() {
  const technologies = await getTechnologies()
  const stacks = await getStacks()
  const allCommands = await getAllCommandsWithTech()
  
  const popularCommands = allCommands.slice(0, 10)

  return (
    <DashboardClient 
      technologies={technologies}
      stacks={stacks}
      popularCommands={popularCommands}
      allCommandsLength={allCommands.length}
    />
  )
}

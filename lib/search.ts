import {
  allCommands,
  stacks,
  technologies,
  type CommandWithTech,
  type Stack,
  type Technology,
} from '@/lib/data'

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

export type SearchResults = {
  technologies: Technology[]
  commands: CommandWithTech[]
  stacks: Stack[]
  total: number
}

export function search(query: string): SearchResults {
  const q = normalize(query.trim())

  if (!q) {
    return {
      technologies: [],
      commands: [],
      stacks: [],
      total: 0,
    }
  }

  const techMatches = technologies.filter((t) => {
    const haystack = normalize(
      [t.name, t.category, t.tagline, t.description, ...t.tags].join(' '),
    )
    return haystack.includes(q)
  })

  const commandMatches = allCommands.filter((c) => {
    const haystack = normalize(
      [c.label, c.command, c.description, c.whenToUse, c.tech.name, ...c.tags].join(
        ' ',
      ),
    )
    return haystack.includes(q)
  })

  const stackMatches = stacks.filter((s) => {
    const haystack = normalize(
      [s.name, s.description, ...s.tags, ...s.technologies].join(' '),
    )
    return haystack.includes(q)
  })

  return {
    technologies: techMatches,
    commands: commandMatches,
    stacks: stackMatches,
    total: techMatches.length + commandMatches.length + stackMatches.length,
  }
}

export type Level = 'iniciante' | 'intermediario' | 'avancado'

export type CommandOption = {
  flag: string
  description: string
}

export type OsCommand = {
  windows?: string
  mac?: string
  linux?: string
  default: string
}

export type Command = {
  id: string
  label: string
  command: string | OsCommand
  description: string
  whenToUse: string
  options?: CommandOption[]
  example?: string
  tags: string[]
}

export type CommandWithTech = Command & { tech: Technology }

export type TutorialStep = {
  title: string
  description: string
  command?: string | OsCommand
  link?: { url: string; label: string }
}

export type TutorialContent = {
  windows: TutorialStep[]
  mac: TutorialStep[]
  linux: TutorialStep[]
}

export type Tutorial = {
  id: string
  title: string
  description: string
  content: TutorialContent
}

export type Technology = {
  id?: string
  slug: string
  name: string
  category: string
  tagline: string
  description: string
  level: Level
  color: string
  iconUrl: string
  tags: string[]
  docsUrl: string
  commands: Command[]
  tutorials?: Tutorial[]
}

export type StackStep = {
  title: string
  command?: string
  description: string
}

export type Stack = {
  slug: string
  name: string
  description: string
  technologies: string[]
  level: Level
  tags: string[]
  popularity: number
  steps: StackStep[]
}

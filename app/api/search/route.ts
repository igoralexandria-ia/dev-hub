import { NextResponse } from 'next/server'
import { getTechnologies, getAllCommandsWithTech } from '@/lib/actions'

export async function GET() {
  try {
    const techs = await getTechnologies()
    const commands = await getAllCommandsWithTech()

    return NextResponse.json({
      technologies: techs.map(t => ({ slug: t.slug, name: t.name, category: t.category })),
      commands: commands.map(c => ({ id: c.id, label: c.label, techName: c.tech.name, techSlug: c.tech.slug }))
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch search data' }, { status: 500 })
  }
}

/**
 * @file ProjectInfo.tsx
 * @description Exibe o título, as tags de tecnologia e a descrição do projeto.
 *
 * As tags são coloridas de forma cíclica com os tokens de marca `brand-1` a
 * `brand-5`, usando o índice da tag para determinar a cor (`i % 5`).
 *
 * A prop `tagScrollable` ativa rolagem horizontal nas tags — útil em viewports
 * estreitas onde o layout empilhado não permite quebra de linha.
 */

import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import type { Project } from '@/types/project'

// ─── Constantes ───────────────────────────────────────────────────────────────

/** Classes Tailwind cicladas pelos tokens de marca para cada tag. */
const BRAND_TAG_CLASSES = [
  'bg-brand-1/10 border-brand-1/30 text-brand-1',
  'bg-brand-2/10 border-brand-2/30 text-brand-2',
  'bg-brand-3/10 border-brand-3/30 text-brand-3',
  'bg-brand-4/10 border-brand-4/30 text-brand-4',
  'bg-brand-5/10 border-brand-5/30 text-brand-5',
] as const

// ─── Sub-componentes ──────────────────────────────────────────────────────────

function TagList({
  tags,
  scrollable,
}: {
  tags: string[]
  scrollable: boolean
}) {
  return (
    <div
      className={cn(
        'flex gap-2',
        scrollable ? 'overflow-x-auto pb-1' : 'flex-wrap',
      )}
      style={
        scrollable
          ? { scrollbarWidth: 'none', msOverflowStyle: 'none' }
          : undefined
      }
    >
      {tags.map((tag, i) => (
        <Badge
          key={tag}
          variant="outline"
          className={cn(
            'shrink-0 rounded-full border px-3 py-1 text-xs font-medium transition-opacity hover:opacity-80',
            BRAND_TAG_CLASSES[i % BRAND_TAG_CLASSES.length],
          )}
        >
          {tag}
        </Badge>
      ))}
    </div>
  )
}

// ─── Componente público ───────────────────────────────────────────────────────

export interface ProjectInfoProps {
  project: Project
  /** Ativa rolagem horizontal nas tags em vez de quebra de linha. @default false */
  tagScrollable?: boolean
}

/**
 * Painel de informações do projeto: título, tags e descrição.
 */
export function ProjectInfo({
  project,
  tagScrollable = false,
}: ProjectInfoProps) {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-tx-primary font-title text-4xl leading-tight font-bold italic md:text-5xl lg:text-6xl">
        {project.title}
      </h1>

      <TagList tags={project.tags} scrollable={tagScrollable} />

      <p className="text-tx-secondary font-sans text-sm leading-relaxed md:text-base lg:text-lg">
        {project.description}
      </p>
    </div>
  )
}

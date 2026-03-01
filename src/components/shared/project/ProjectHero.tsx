/**
 * @file ProjectHero.tsx
 * @description Componente orquestrador da pagina de detalhes do projeto.
 *
 * Compoe os sub-componentes de midia, informacoes, estatisticas e acoes em
 * dois layouts:
 * - **Desktop** (`md+`): grid de 2 colunas - midia a esquerda, conteudo a direita.
 * - **Mobile**: midia sticky no topo com gradiente de transicao; card de
 *   conteudo sobe sobre a midia em overlay ao rolar.
 *
 * Para personalizar partes individualmente, importe os sub-componentes
 * diretamente: `ProjectMedia`, `ProjectInfo`, `ProjectStats`, `ProjectActions`.
 */

import { ProjectMedia } from './ProjectMedia'
import { ProjectInfo } from './ProjectInfo'
import { ProjectStats } from './ProjectStats'
import { ProjectActions } from './ProjectActions'
import type { Project } from '@/types/project'

export interface ProjectHeroProps {
  project: Project
}

/**
 * Hero completo da pagina de detalhes - orquestra midia e painel de informacoes.
 */
export function ProjectHero({ project }: ProjectHeroProps) {
  return (
    <section aria-label="Detalhes do projeto">
      {/* Desktop: grid 2 colunas */}
      <div className="hidden md:grid md:grid-cols-2 md:items-center md:gap-16">
        <ProjectMedia project={project} />

        <div className="flex flex-col gap-6">
          <ProjectInfo project={project} />
          {project.stats && project.stats.length > 0 && (
            <ProjectStats stats={project.stats} />
          )}
          <ProjectActions project={project} />
        </div>
      </div>

      {/* Mobile: midia sticky + card de conteudo em overlay */}
      <div className="md:hidden">
        <ProjectMedia project={project} />

        <div className="bg-background relative z-10 -mt-8 rounded-t-3xl px-6 pt-8 pb-16 shadow-[0_-8px_30px_rgba(0,0,0,0.12)]">
          <div className="flex flex-col gap-6">
            <ProjectInfo project={project} tagScrollable />
            {project.stats && project.stats.length > 0 && (
              <ProjectStats stats={project.stats} />
            )}
            <ProjectActions project={project} />
          </div>
        </div>
      </div>
    </section>
  )
}

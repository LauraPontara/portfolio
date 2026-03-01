import { ExternalLink } from 'lucide-react'
import { LuGithub as Github } from 'react-icons/lu'

import { Button } from '@/components/ui/button'
import type { Project } from '@/types/project'
import { isWebProject, isMobileProject } from '@/lib/utils/project-logic'

export interface ProjectActionsProps {
  project: Project
}

/**
 * Renderiza os botões de links externos adaptados à categoria do projeto.
 *
 * * Adapta os botões exibidos conforme a categoria do projeto:
 * - **Web**: "Acessar Site" e "Repositório GitHub".
 * - **Mobile**: "App Store", "Play Store" e "Repositório GitHub" —
 *   cada botão é condicionalmente renderizado se o link existir.
 */
export function ProjectActions({ project }: ProjectActionsProps) {
  if (isWebProject(project)) {
    return (
      <div className="flex flex-col gap-3 sm:flex-row">
        {project.links.website && (
          <Button asChild size="lg" className="rounded-full">
            <a
              href={project.links.website}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink />
              Acessar Site
            </a>
          </Button>
        )}
        {project.links.github && (
          <Button asChild size="lg" variant="outline" className="rounded-full">
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github />
              Repositório GitHub
            </a>
          </Button>
        )}
      </div>
    )
  }

  if (isMobileProject(project)) {
    const appleStoreUrl =
      'appleStore' in project.links ? project.links.appleStore : undefined
    const playStoreUrl =
      'playStore' in project.links ? project.links.playStore : undefined

    return (
      <div className="flex flex-col gap-3 sm:flex-row">
        {appleStoreUrl && (
          <Button asChild size="lg" className="rounded-full">
            <a href={appleStoreUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink />
              App Store
            </a>
          </Button>
        )}
        {playStoreUrl && (
          <Button asChild size="lg" className="rounded-full">
            <a href={playStoreUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink />
              Play Store
            </a>
          </Button>
        )}
        {project.links.github && (
          <Button asChild size="lg" variant="outline" className="rounded-full">
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github />
              Repositório GitHub
            </a>
          </Button>
        )}
      </div>
    )
  }

  return null
}

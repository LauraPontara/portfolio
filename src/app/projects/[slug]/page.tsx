import { notFound } from 'next/navigation'
import { projects } from '@/constants/projects'
import {
  ProjectMedia,
  ProjectInfo,
  ProjectStats,
  ProjectActions,
} from '@/components/shared'

/**
 * Gera os parâmetros estáticos para cada projeto.
 * @returns Uma lista de objetos contendo os slugs dos projetos.
 */
export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

/**
 * Página de detalhes do projeto. Renderiza as informações do projeto com base no slug.
 * @param param0 - Objeto contendo os parâmetros da rota, incluindo o slug do projeto.
 *
 * @returns JSX para a página de detalhes do projeto ou uma página 404 se o projeto não for encontrado.
 */
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)

  if (!project) notFound()

  return (
    <main className="bg-background min-h-screen px-6 py-24">
      <div className="mx-auto max-w-6xl">
        {/* Desktop: grid 2 colunas */}
        <section
          aria-label="Detalhes do projeto"
          className="hidden md:grid md:grid-cols-2 md:items-center md:gap-16"
        >
          <ProjectMedia project={project} />

          <div className="flex flex-col gap-6">
            <ProjectInfo project={project} />
            {project.stats && project.stats.length > 0 && (
              <ProjectStats stats={project.stats} />
            )}
            <ProjectActions project={project} />
          </div>
        </section>

        {/* Mobile: mídia sticky + card de conteúdo em overlay */}
        <section aria-label="Detalhes do projeto" className="md:hidden">
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
        </section>
      </div>
    </main>
  )
}

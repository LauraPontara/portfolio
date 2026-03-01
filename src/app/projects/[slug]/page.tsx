import { notFound } from 'next/navigation'
import { projects } from '@/constants/projects'
import type { Project } from '@/types/project'

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

/**
 * Busca o projeto com base no slug.
 */
async function getProjectBySlug(slug: string): Promise<Project | null> {
  const project = projects.find((p) => p.slug === slug)
  return project || null
}

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
export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  return (
    <main className="bg-background min-h-screen px-6 py-24">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Aqui depois vamos inserir o componente Safari/Video/3D */}
        <div className="bg-muted aspect-video w-full overflow-hidden rounded-xl border">
          {/* Placeholder para a Thumbnail */}
          <p className="text-tx-secondary flex h-full items-center justify-center">
            Thumbnail: {project.thumbnail.type}
          </p>
        </div>

        <header className="space-y-4">
          <h1 className="text-tx-primary font-sans text-5xl font-bold tracking-tight">
            {project.title}
          </h1>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        <p className="text-tx-secondary border-primary border-l-4 pl-6 text-lg leading-relaxed">
          {project.description}
        </p>

        {/* Estatísticas (Stats) */}
        {project.stats && (
          <div className="grid grid-cols-2 gap-4 pt-8 md:grid-cols-4">
            {project.stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-card flex flex-col rounded-lg border p-4"
              >
                <span className="text-tx-muted text-xs tracking-wider uppercase">
                  {stat.label}
                </span>
                <span className="text-tx-primary text-2xl font-bold">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

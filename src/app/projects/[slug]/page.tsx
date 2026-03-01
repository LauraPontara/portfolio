import { notFound } from 'next/navigation'
import { projects } from '@/constants/projects'
import { ProjectHero } from '@/components/shared'

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
        <ProjectHero project={project} />
      </div>
    </main>
  )
}

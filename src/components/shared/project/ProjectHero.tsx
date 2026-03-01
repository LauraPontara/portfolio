/**
 * @file ProjectHero.tsx
 * @description Componente principal da página de detalhes de um projeto.
 * Gerencia dois layouts distintos baseados na categoria do projeto:
 *
 * - **Web**: Renderiza um mockup de Safari (Magic UI) preenchido com a thumbnail
 *   do projeto (imagem ou vídeo) e exibe os links de acesso ao site e repositório.
 *
 * - **Mobile (Trio)**: Renderiza três iPhones (Magic UI) lado a lado quando a
 *   thumbnail contém o campo `devices`. O iPhone central fica em primeiro plano
 *   e os dois laterais são animados com Framer Motion (fade-in + slide-up).
 *
 * - **Mobile (Simples)**: Renderiza um único iPhone para projetos mobile com
 *   thumbnail convencional.
 *
 */
'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Safari } from '@/components/ui/safari'
import { Iphone } from '@/components/ui/iphone'
import type {
  Project,
  WebProject,
  MobileProject,
  MobileHeroMedia,
  ProjectThumbnail,
} from '@/types/project'

// ─── Constants ────────────────────────────────────────────────────────────────

/**
 * Mapeamento cíclico de classes Tailwind para os tokens de marca (brand-1 a brand-5).
 * Atribuído por índice (`i % 5`) às tags de cada projeto.
 */
const BRAND_TAG_CLASSES = [
  'bg-brand-1/10 border-brand-1/30 text-brand-1',
  'bg-brand-2/10 border-brand-2/30 text-brand-2',
  'bg-brand-3/10 border-brand-3/30 text-brand-3',
  'bg-brand-4/10 border-brand-4/30 text-brand-4',
  'bg-brand-5/10 border-brand-5/30 text-brand-5',
] as const

// ─── Framer Motion Transition Presets ───────────────────────────────────────

const entranceTransition = (delay: number) => ({
  duration: 0.6,
  ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
  delay,
})

// ─── Type Guards ──────────────────────────────────────────────────────────────

function isMobileHeroThumbnail(
  thumbnail: ProjectThumbnail | MobileHeroMedia,
): thumbnail is MobileHeroMedia {
  return 'devices' in thumbnail
}

function isWebProject(project: Project): project is WebProject {
  return project.category === 'web'
}

function isMobileProject(project: Project): project is MobileProject {
  return project.category === 'mobile'
}

// ─── Media Prop Resolvers ─────────────────────────────────────────────────────

function resolveSafariProps(thumbnail: ProjectThumbnail) {
  return thumbnail.type === 'video'
    ? { videoSrc: thumbnail.url }
    : { imageSrc: thumbnail.url }
}

function resolveIphoneProps(thumbnail: ProjectThumbnail) {
  return thumbnail.type === 'video'
    ? { videoSrc: thumbnail.url }
    : { src: thumbnail.url }
}

// ─── Media Sub-Components ─────────────────────────────────────────────────────

function WebMediaFrame({ project }: { project: WebProject }) {
  const mediaProps = resolveSafariProps(project.thumbnail as ProjectThumbnail)
  const websiteUrl = project.links.website ?? 'https://example.com'

  return (
    <Safari
      url={websiteUrl}
      {...mediaProps}
      className="w-full drop-shadow-2xl"
    />
  )
}

function MobileTrioFrame({ devices }: { devices: MobileHeroMedia['devices'] }) {
  const [front, leftBack, rightBack] = devices

  return (
    <div className="relative mx-auto w-full" style={{ paddingBottom: '95%' }}>
      {/* iPhone esquerdo — atrás e animado */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={entranceTransition(0.2)}
        className="absolute left-0 z-10 w-[38%]"
        style={{
          top: '8%',
          transform: 'scale(0.85)',
          transformOrigin: 'bottom center',
        }}
      >
        <Iphone {...resolveIphoneProps(leftBack)} className="" />
      </motion.div>

      {/* iPhone direito — atrás e animado */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={entranceTransition(0.3)}
        className="absolute right-0 z-10 w-[38%]"
        style={{
          top: '8%',
          transform: 'scale(0.85)',
          transformOrigin: 'bottom center',
        }}
      >
        <Iphone {...resolveIphoneProps(rightBack)} className="" />
      </motion.div>

      {/* iPhone central — frente, entra primeiro */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={entranceTransition(0.0)}
        className="absolute top-0 left-1/2 z-20 w-[46%] -translate-x-1/2"
      >
        <Iphone {...resolveIphoneProps(front)} className="" />
      </motion.div>
    </div>
  )
}

function SingleMobileFrame({ thumbnail }: { thumbnail: ProjectThumbnail }) {
  return (
    <div className="mx-auto w-full max-w-55 md:max-w-70">
      <Iphone {...resolveIphoneProps(thumbnail)} className="drop-shadow-2xl" />
    </div>
  )
}

// ─── Info Sub-Components ──────────────────────────────────────────────────────

function TagList({
  tags,
  scrollable = false,
}: {
  tags: string[]
  scrollable?: boolean
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

function StatGrid({ stats }: { stats: NonNullable<Project['stats']> }) {
  return (
    <div className="border-border flex gap-8 border-t pt-6">
      {stats.map((stat) => (
        <div key={stat.label} className="flex flex-col gap-0.5">
          <span className="text-tx-primary font-title text-3xl font-bold italic">
            {stat.value}
          </span>
          <span className="text-tx-secondary font-sans text-xs tracking-widest uppercase">
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  )
}

function ActionButtons({ project }: { project: Project }) {
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
    const githubUrl = project.links.github

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
        {githubUrl && (
          <Button asChild size="lg" variant="outline" className="rounded-full">
            <a href={githubUrl} target="_blank" rel="noopener noreferrer">
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

// ─── Media Dispatcher ─────────────────────────────────────────────────────────

function ProjectMedia({ project }: { project: Project }) {
  if (isWebProject(project)) {
    return <WebMediaFrame project={project} />
  }

  if (isMobileProject(project)) {
    if (isMobileHeroThumbnail(project.thumbnail)) {
      return <MobileTrioFrame devices={project.thumbnail.devices} />
    }
    return (
      <SingleMobileFrame thumbnail={project.thumbnail as ProjectThumbnail} />
    )
  }

  return null
}

// ─── Info Panel ───────────────────────────────────────────────────────────────

function InfoPanel({
  project,
  tagScrollable = false,
}: {
  project: Project
  tagScrollable?: boolean
}) {
  return (
    <div className="flex flex-col gap-6 md:gap-7">
      <h1 className="text-tx-primary font-title text-4xl leading-tight font-bold italic md:text-5xl lg:text-6xl">
        {project.title}
      </h1>

      <TagList tags={project.tags} scrollable={tagScrollable} />

      <p className="text-tx-secondary font-sans text-sm leading-relaxed md:text-base lg:text-lg">
        {project.description}
      </p>

      {project.stats && project.stats.length > 0 && (
        <StatGrid stats={project.stats} />
      )}

      <ActionButtons project={project} />
    </div>
  )
}

// ─── Props ────────────────────────────────────────────────────────────────────

export interface ProjectHeroProps {
  project: Project
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Hero da página de detalhes de um projeto.
 *
 * Renderiza a mídia principal do projeto (Safari para web, iPhones para mobile)
 * ao lado do painel de informações (título, tags, descrição, stats e botões).
 *
 */
export function ProjectHero({ project }: ProjectHeroProps) {
  return (
    <section aria-label="Detalhes do projeto">
      {/* ── Desktop: Grid 2 colunas ─────────────────────────────────────────── */}
      <div className="hidden md:grid md:grid-cols-2 md:items-center md:gap-16">
        <div className="flex items-center justify-center">
          <ProjectMedia project={project} />
        </div>
        <InfoPanel project={project} />
      </div>

      {/* ── Mobile: Mídia sticky + card de conteúdo em overlay ──────────────── */}
      <div className="md:hidden">
        {/* Mídia fixa no topo enquanto o conteúdo sobe */}
        <div className="sticky top-0 z-0">
          <div className="bg-background relative px-8 pt-8 pb-16">
            <ProjectMedia project={project} />

            {/* Gradiente que suaviza a transição mídia → card */}
            <div
              aria-hidden
              className="from-background pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-linear-to-t to-transparent"
            />
          </div>
        </div>

        {/* Card de informações — sobrepõe a mídia ao rolar */}
        <div className="bg-background relative z-10 -mt-8 rounded-t-3xl px-6 pt-8 pb-16 shadow-[0_-8px_30px_rgba(0,0,0,0.12)]">
          <div className="-mx-6 mb-6 px-6">
            <InfoPanel project={project} tagScrollable />
          </div>
        </div>
      </div>
    </section>
  )
}

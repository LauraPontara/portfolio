import type { Project } from '@/types/project'

/**
 * Dados dos projetos do portfólio.
 *
 * Fonte única de verdade para todos os projetos. Cada entrada é fortemente
 * tipada pelo tipo discriminado `Project`, garantindo que apenas os campos
 * válidos por categoria sejam utilizados.
 */
export const projects: Project[] = [
  // ── Projetos Web ───────────────────────────────────────────────────────────
  {
    id: '1',
    slug: 'portfolio',
    title: 'Portfolio Pessoal',
    description:
      'Site de portfólio construído com Next.js 15, Tailwind CSS v4 e Spline 3D.',
    category: 'web',
    thumbnail: {
      type: 'image',
      url: '/thumbnails/portfolio.png',
    },
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Spline'],
    links: {
      github: 'https://github.com/carlossilva/portfolio',
      website: 'https://carlossilva.dev',
    },
    stats: [
      { label: 'Lighthouse', value: '100' },
      { label: 'Componentes', value: '30+' },
    ],
    featured: true,
  },

  // ── Projetos Mobile ─────────────────────────────────────────────────--------
  {
    id: '2',
    slug: 'finance-app',
    title: 'Finance App',
    description:
      'Aplicativo de finanças pessoais com React Native e Expo, disponível em ambas as lojas.',
    category: 'mobile',
    thumbnail: {
      type: 'video',
      url: '/thumbnails/finance-app.mp4',
    },
    tags: ['React Native', 'Expo', 'TypeScript'],
    links: {
      github: 'https://github.com/carlossilva/finance-app',
      appleStore: 'https://apps.apple.com/app/finance-app',
      playStore: 'https://play.google.com/store/apps/finance-app',
    },
    stats: [
      { label: 'Downloads', value: '5k+' },
      { label: 'Avaliação', value: '4.8 ★' },
    ],
    featured: true,
  },
]

/**
 * Retorna apenas os projetos marcados como `featured`, útil para a seção de
 * destaque na página inicial.
 */
export const featuredProjects = projects.filter((p) => p.featured)

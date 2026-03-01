import type { Project } from '@/types/project'

/**
 * Dados dos projetos do portfólio.
 *
 * Fonte única de verdade para todos os projetos. Cada entrada é fortemente
 * tipada pelo tipo discriminado `Project`, garantindo que apenas os campos
 * válidos por categoria sejam utilizados.
 */

export const projects: Project[] = [
  {
    id: '1',
    slug: 'portfolio-web',
    title: 'Portfolio Pessoal',
    description: 'Site construído com Next.js 15 e Tailwind v4.',
    category: 'web',
    thumbnail: { type: 'image', url: 'https://placehold.co/600x400' },
    tags: ['Next.js', 'React', 'Tailwind'],
    links: { github: 'https://github.com', website: 'https://meusite.com' },
    featured: true,
  },
  {
    id: '2',
    slug: 'finance-app',
    title: 'Finance App',
    description: 'Controle financeiro completo com visual imersivo.',
    category: 'mobile',
    thumbnail: {
      devices: [
        {
          type: 'video',
          url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        },
        { type: 'image', url: 'https://placehold.co/600x400' },
        { type: 'image', url: 'https://placehold.co/600x400' },
      ],
    },
    tags: ['React Native', 'Expo', 'Supabase'],
    links: { appleStore: 'https://apple.com', playStore: 'https://google.com' },
  },
]

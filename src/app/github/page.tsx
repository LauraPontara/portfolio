import {
  Clock,
  BarChart2,
  ExternalLink,
  GitBranch,
  Users,
  BookMarked,
  Star,
  Calendar,
} from 'lucide-react'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'

// ─── Data ─────────────────────────────────────────────────────────────────────

const profileStats = [
  { label: 'Seguidores', value: '842', icon: Users },
  { label: 'Repositórios', value: '124', icon: BookMarked },
  { label: 'Stars', value: '2.1k', icon: Star },
]

const languages = [
  { name: 'TypeScript', percentage: 45, color: 'bg-brand-4' },
  { name: 'React', percentage: 30, color: 'bg-brand-5' },
  { name: 'Node.js', percentage: 15, color: 'bg-accent-3' },
  { name: 'Python', percentage: 10, color: 'bg-accent-4' },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function GithubPage() {
  return (
    <div className="bg-background min-h-screen">
      <main className="mx-auto max-w-6xl px-8 pt-32 pb-20">
        {/* ── Título da Seção ─────────────────────────────────────────────── */}
        <section className="mb-10">
          <h1 className="text-tx-primary mb-3 text-5xl font-bold tracking-tight">
            Atividades no{' '}
            <span className="font-title italic text-accent-2">Github</span>
          </h1>
          <p className="text-tx-secondary max-w-lg text-sm leading-relaxed">
            Acompanhe meu fluxo de trabalho diário, contribuições em projetos
            open-source e as tecnologias que mais utilizo no meu ecossistema de
            desenvolvimento.
          </p>
        </section>

        {/* ── Grid de Cards ───────────────────────────────────────────────── */}
        <div className="grid gap-4 md:grid-cols-3">
          {/* Card 1 — Perfil do GitHub */}
          <Card className="border-border bg-card gap-0 rounded-2xl border py-0">
            <CardContent className="p-6">
              {/* Avatar + Nome */}
              <div className="mb-5 flex items-center gap-3">
                <Avatar className="h-11 w-11 ring-2 ring-border">
                  <AvatarImage
                    src="https://github.com/identicons/carlossilvadev.png"
                    alt="Carlos Silva"
                  />
                  <AvatarFallback className="bg-brand-5/20 text-tx-primary text-sm font-bold">
                    CS
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-tx-primary text-sm font-bold leading-tight">
                    Carlos Silva
                  </p>
                  <p className="text-tx-muted text-xs">@carlossilvadev</p>
                </div>
              </div>

              <Separator className="bg-border mb-4" />

              {/* Stats */}
              <div className="space-y-3">
                {profileStats.map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between">
                    <span className="text-tx-secondary text-sm">{label}</span>
                    <span className="text-tx-primary text-sm font-bold">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Card 2 — Último Commit */}
          <Card className="border-border bg-card gap-0 rounded-2xl border py-0">
            <CardHeader className="px-6 pt-6 pb-4">
              <CardTitle className="text-tx-primary flex items-center gap-2 text-sm font-semibold">
                <Clock size={14} className="text-accent-2" />
                Último Commit
              </CardTitle>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              {/* Commit Message */}
              <p className="text-tx-primary mb-3 text-base font-bold leading-snug">
                feat: implement dark mode context with persistence
              </p>

              {/* Repo + Data */}
              <div className="text-tx-muted mb-4 flex items-center gap-1.5 text-xs">
                <GitBranch size={12} />
                <span className="text-tx-secondary font-medium">
                  portfolio-v3
                </span>
                <span>•</span>
                <span>há 2 dias</span>
              </div>

              {/* Link */}
              <a
                href="#"
                className="text-accent-2 hover:text-accent-1 inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase transition-colors"
              >
                Ver no GitHub
                <ExternalLink size={11} />
              </a>
            </CardContent>
          </Card>

          {/* Card 3 — Top Linguagens */}
          <Card className="border-border bg-card gap-0 rounded-2xl border py-0">
            <CardHeader className="px-6 pt-6 pb-4">
              <CardTitle className="text-tx-primary flex items-center gap-2 text-sm font-semibold">
                <BarChart2 size={14} className="text-accent-2" />
                Top Linguagens
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3.5 px-6 pb-6">
              {languages.map(({ name, percentage, color }) => (
                <div key={name}>
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-tx-secondary text-xs font-medium">
                      {name}
                    </span>
                    <span className="text-tx-muted text-xs">{percentage}%</span>
                  </div>
                  <div className="bg-border h-1.5 w-full overflow-hidden rounded-full">
                    <div
                      className={`h-full rounded-full ${color} transition-all duration-500`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* ── Contribuições (placeholder para próxima iteração) ──────────── */}
        <Card className="border-border bg-card mt-4 gap-0 rounded-2xl border py-0">
          <CardHeader className="px-6 pt-6 pb-4">
            <CardTitle className="text-tx-primary flex items-center justify-between text-sm font-semibold">
              <span className="flex items-center gap-2">
                <Calendar size={14} className="text-accent-2" />
                Contribuições no último ano
              </span>
              <span className="text-tx-secondary text-xs font-normal">
                1,284 contribuições
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex h-48 items-center justify-center px-6 pb-6">
            <p className="text-tx-muted text-sm">
              Gráfico de contribuições — próxima iteração
            </p>
          </CardContent>
        </Card>
      </main>

      {/* ── Footer ──────────────────────────────────────────────────────────── */}
      <footer className="border-border border-t py-6">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-8">
          <p className="text-tx-muted text-xs">
            © 2024 Carlos Silva. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-6">
            {['GitHub', 'LinkedIn', 'Twitter'].map((link) => (
              <a
                key={link}
                href="#"
                className="text-tx-muted hover:text-tx-primary text-xs transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}

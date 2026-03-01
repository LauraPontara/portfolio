import type { ProjectStat } from '@/types/project'

export interface ProjectStatsProps {
  stats: ProjectStat[]
}

/**
 * Exibe uma grade horizontal de estatísticas do projeto separada por uma borda
 * superior sutil.
 */
export function ProjectStats({ stats }: ProjectStatsProps) {
  if (stats.length === 0) return null

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

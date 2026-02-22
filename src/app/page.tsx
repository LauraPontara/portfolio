import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="bg-background relative flex min-h-screen items-center justify-center font-sans transition-colors duration-300">
      <main className="relative z-10 flex min-h-screen w-full max-w-7xl flex-col items-center justify-between px-16 py-32 sm:items-start">
        <div className="flex w-full items-center justify-between">
          <AnimatedThemeToggler />
          <span className="text-tx-success bg-tx-success/10 rounded-full px-3 py-1 text-xs font-bold tracking-widest uppercase">
            Disponível para projetos
          </span>
        </div>

        <Image
          className="opacity-80 dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />

        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="font-title text-tx-primary text-7xl leading-[1.02] font-bold tracking-tight italic sm:text-[7.5rem]">
            Desenvolvendo <br />
            <span className="text-accent-2">experiências</span>{' '}
            <span className="text-accent-5">fluidas.</span>
          </h1>
          <p className="text-tx-secondary max-w-md text-xl leading-relaxed">
            Especialista em interfaces 3D e performance, utilizando os tokens{' '}
            <code className="bg-accent-3/20 text-accent-3 rounded px-1.5 py-0.5 font-mono text-sm">
              #dynamic-system
            </code>
          </p>
        </div>

        <div className="flex w-full flex-col gap-4 text-base font-medium sm:flex-row">
          <button className="bg-brand-5 shadow-brand-5/20 flex h-14 w-full items-center justify-center gap-2 rounded-2xl px-8 text-white shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] md:w-auto">
            Iniciar Projeto
          </button>
          <button className="border-accent-4 text-tx-accent hover:bg-accent-4/5 flex h-14 w-full items-center justify-center rounded-2xl border bg-transparent px-8 transition-all md:w-auto">
            Ver Documentação
          </button>
        </div>
        <footer className="text-tx-muted text-sm">
          © 2026 • Construído com Next.js
        </footer>
      </main>
    </div>
  )
}

export default function Home() {
  return (
    <div className="bg-background relative flex min-h-screen items-center justify-center font-sans transition-colors duration-300">
      <main className="relative z-10 flex min-h-screen w-full max-w-7xl flex-col items-center justify-between px-16 py-32 sm:items-start">
        <div className="flex w-full items-center justify-between">
          <span className="text-tx-success bg-tx-success/10 rounded-full px-3 py-1 text-xs font-bold tracking-widest uppercase">
            Disponível para projetos
          </span>
        </div>

        <div className="flex flex-col items-center gap-4 text-center sm:items-start sm:text-left">
          <h1 className="text-tx-primary font-sans text-2xl leading-[1.06] font-bold tracking-tight italic sm:text-[3rem]">
            Olá eu sou [Seu nome]
          </h1>
          <h2 className="font-title text-tx-primary text-3xl font-bold italic sm:text-[5rem] md:text-[6rem]">
            <span className="text-accent-2">Engenheiro</span>{' '}
            <span className="text-accent-5">De Software</span>
          </h2>
        </div>

        <div className="flex w-full flex-col gap-4 text-base font-medium sm:flex-row">
          <button className="bg-brand-5 shadow-brand-5/20 flex h-14 w-full items-center justify-center gap-2 rounded-2xl px-8 text-white shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] md:w-auto">
            Enviar mensagem
          </button>
        </div>
        <footer className="text-tx-muted text-sm">
          © 2026 • Construído com Next.js
        </footer>
      </main>
    </div>
  )
}

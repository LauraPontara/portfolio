import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler'
import Spline from '@splinetool/react-spline/next'

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Spline scene="https://prod.spline.design/E3Np8UpeDg8IrCCr/scene.splinecode" />
      </div>
      <main className="pointer-events-none relative z-10 flex min-h-screen w-full flex-col items-center justify-between px-16 py-32 sm:items-start">
        <div className="pointer-events-auto">
          <AnimatedThemeToggler />
        </div>
      </main>
    </div>
  )
}

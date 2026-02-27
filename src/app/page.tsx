import { ContactForm } from '@/components'
import { ContentSection } from '@/components/section/content-section'
import { emailSectionTranslations } from '@/components/section/section-translations'
import Spline from '@splinetool/react-spline/next'

export default function Home() {
  return (
    <div className="bg-background relative w-full font-sans transition-colors duration-300">
      <section className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 z-0 flex items-center justify-center">
          <div className="mt-20 h-[50vh] w-full lg:mt-0 lg:h-full">
            <Spline scene="https://prod.spline.design/E3Np8UpeDg8IrCCr/scene.splinecode" />
          </div>
        </div>

        <div className="pointer-events-none relative z-10 mx-auto flex min-h-screen max-w-350 flex-col items-center px-6 pt-24 lg:grid lg:grid-cols-3 lg:items-center lg:px-16 lg:pt-0">
          <div className="flex flex-col items-center text-center lg:items-start lg:self-center lg:text-left">
            <h1 className="text-tx-primary text-3xl leading-[1.1] font-bold tracking-tighter sm:text-4xl md:text-4xl lg:text-5xl xl:text-7xl">
              Olá, eu sou <br className="hidden lg:block" /> Carlos Silva
            </h1>
          </div>

          <div className="hidden lg:block lg:h-full" />

          <div className="mt-4 flex flex-col items-center justify-center text-center lg:mt-0 lg:items-end lg:self-center lg:text-right">
            <h2 className="font-title text-tx-primary flex flex-col text-6xl leading-[1.1] font-bold italic sm:text-7xl md:text-8xl lg:text-6xl xl:text-8xl">
              <span className="text-accent-2">Engenheiro</span>
              <span className="text-accent-5 lg:whitespace-nowrap">
                de Software
              </span>
            </h2>
          </div>
        </div>
      </section>

      <ContentSection
        translations={emailSectionTranslations}
        text_orientation="center"
        sectionSize="small"
      >
        <ContactForm />
      </ContentSection>

      <footer className="text-tx-muted pb-8 text-center text-xs md:text-sm">
        © 2026 • Construído com Next.js
      </footer>
    </div>
  )
}

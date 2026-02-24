'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { User, Briefcase, Mail, BookOpen, Send, X, Menu } from 'lucide-react'
import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler'
import { LanguageToggle } from './language-toggle'
import { usePortfolioStore } from '@/store/use-portfolio-store'
import { cn } from '@/lib/utils'

const translations = {
  pt: {
    name: 'Carlos Silva',
    about: 'Sobre mim',
    projects: 'Projetos',
    experience: 'Experiências',
    contact: 'Contato',
    cta: 'Enviar mensagem',
  },
  en: {
    name: 'Carlos Silva',
    about: 'About me',
    projects: 'Projects',
    experience: 'Experience',
    contact: 'Contact',
    cta: 'Send a message',
  },
}

const menuVariants = {
  closed: { scale: 0.95, opacity: 0, y: -20 },
  open: { scale: 1, opacity: 1, y: 0 },
}

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const { language } = usePortfolioStore()
  const t = translations[language]

  return (
    <div className="fixed top-4 left-1/2 z-50 w-[calc(100vw-32px)] max-w-sm -translate-x-1/2">
      <div
        className={cn(
          'border-border/50 bg-card/90 relative z-50 flex items-center justify-between border px-4 py-3 shadow-lg backdrop-blur-md transition-all duration-300',
          isOpen ? 'rounded-t-2xl' : 'rounded-full',
        )}
      >
        <div className="flex items-center gap-3">
          <span className="font-title text-tx-primary text-lg font-bold italic">
            CS
          </span>
          <span className="bg-border h-4 w-px" />
          <span className="text-tx-primary font-sans text-sm font-medium">
            {t.name}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <LanguageToggle />
          <AnimatedThemeToggler className="text-tx-secondary flex h-8 w-8 items-center justify-center rounded-full" />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-tx-primary p-1"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="border-border/50 bg-card/95 absolute top-full left-0 w-full overflow-hidden rounded-b-2xl border border-t-0 px-2 pt-2 pb-4 shadow-xl backdrop-blur-md"
          >
            <nav className="flex flex-col gap-1">
              {[
                { href: '/#about', label: t.about, icon: User },
                { href: '/#projects', label: t.projects, icon: Briefcase },
                { href: '/#contact', label: t.contact, icon: Mail },
                { href: '/guestbook', label: 'Guestbook', icon: BookOpen },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-tx-secondary hover:text-tx-primary flex items-center gap-3 rounded-xl p-3 font-sans transition-colors hover:bg-white/5"
                >
                  <link.icon size={20} />
                  <span className="text-sm font-medium">{link.label}</span>
                </Link>
              ))}
              <Link
                href="/#contact"
                className="from-brand-3 to-brand-5 mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r py-3 font-sans text-sm font-normal text-white"
              >
                <Send size={20} /> {t.cta}
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

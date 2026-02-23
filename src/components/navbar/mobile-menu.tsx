'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion, type Variants } from 'framer-motion'
import {
  User,
  Briefcase,
  Award,
  Mail,
  BookOpen,
  Send,
  X,
  Menu,
} from 'lucide-react'

import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler'
import { LanguageToggle } from './language-toggle'
import { usePortfolioStore } from '@/store/use-portfolio-store'
import { cn } from '@/lib/utils'

const translations = {
  pt: {
    name: 'Seu nome',
    about: 'Sobre mim',
    projects: 'Projetos',
    experience: 'Experiências',
    contact: 'Contato',
    cta: 'Enviar mensagem',
  },
  en: {
    name: 'Seu nome',
    about: 'About me',
    projects: 'Projects',
    experience: 'Experience',
    contact: 'Contact',
    cta: 'Send a message',
  },
}

const links = (t: (typeof translations)['pt']) => [
  { href: '/#about', label: t.about, icon: User },
  { href: '/#projects', label: t.projects, icon: Briefcase },
  { href: '/#experience', label: t.experience, icon: Award },
  { href: '/#contact', label: t.contact, icon: Mail },
  { href: '/guestbook', label: 'Mural de Visitantes', icon: BookOpen },
]

const itemVariants: Variants = {
  hidden: { opacity: 0, y: -6 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.2, ease: 'easeOut' as const },
  }),
  exit: { opacity: 0, y: -4, transition: { duration: 0.1 } },
}

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const { language } = usePortfolioStore()
  const t = translations[language]
  const navLinks = links(t)

  return (
    <motion.div
      layout
      className={cn(
        'fixed top-4 left-1/2 z-50 w-[calc(100vw-32px)] max-w-sm -translate-x-1/2',
        'border-border/50 bg-card/90 border backdrop-blur-md',
        'overflow-hidden shadow-lg',
      )}
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0, borderRadius: isOpen ? 20 : 9999 }}
      transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
    >
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="font-title text-tx-primary text-lg font-bold italic">
            SN
          </span>
          <span className="bg-border h-4 w-px" />
          <span className="text-tx-primary text-sm font-medium">{t.name}</span>
        </div>

        <div className="flex items-center gap-2">
          <LanguageToggle />
          <AnimatedThemeToggler className="bg-card/80 text-tx-secondary hover:text-tx-primary flex h-8 w-8 items-center justify-center rounded-full transition-colors [&_svg]:size-4" />
          <button
            onClick={() => setIsOpen((v) => !v)}
            className="text-tx-secondary hover:text-tx-primary flex h-8 w-8 items-center justify-center rounded-full transition-colors"
            aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {isOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="border-border/30 border-t pb-3"
          >
            <nav className="mt-1 px-2">
              {navLinks.map((link, i) => {
                const Icon = link.icon
                return (
                  <motion.div
                    key={link.href}
                    custom={i}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        'flex items-center gap-3 rounded-xl px-4 py-3',
                        'text-tx-secondary hover:text-tx-primary hover:bg-white/5',
                        'transition-colors duration-150',
                      )}
                    >
                      <Icon size={16} className="shrink-0 opacity-70" />
                      <span className="text-sm font-medium">{link.label}</span>
                    </Link>
                  </motion.div>
                )
              })}
            </nav>

            <motion.div
              custom={navLinks.length}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="border-border/30 mt-2 border-t px-4 pt-3"
            >
              <Link
                href="/#contact"
                onClick={() => setIsOpen(false)}
                className="from-brand-3 to-brand-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r px-4 py-3 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
              >
                <Send size={14} />
                {t.cta}
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

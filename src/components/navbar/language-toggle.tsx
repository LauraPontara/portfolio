'use client'

import { usePortfolioStore } from '@/store/use-portfolio-store'
import { cn } from '@/lib/utils'

interface LanguageToggleProps {
  className?: string
}

export function LanguageToggle({ className }: LanguageToggleProps) {
  const { language, toggleLanguage } = usePortfolioStore()

  return (
    <button
      onClick={toggleLanguage}
      className={cn(
        'font-mono text-xs font-medium tracking-widest uppercase',
        'text-tx-secondary hover:text-tx-primary transition-colors duration-200',
        className,
      )}
    >
      {language === 'pt' ? 'EN' : 'PT'}
    </button>
  )
}

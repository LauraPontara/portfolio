import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Language = 'pt' | 'en'

type PortfolioStore = {
  language: Language
  toggleLanguage: () => void
}

export const usePortfolioStore = create<PortfolioStore>()(
  persist(
    (set, get) => ({
      language: 'pt',
      toggleLanguage: () =>
        set({ language: get().language === 'pt' ? 'en' : 'pt' }),
    }),
    {
      name: 'portfolio-store',
      partialize: (state) => ({ language: state.language }),
    },
  ),
)

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'light' | 'dark' | 'system'

interface ThemeState {
  theme: Theme
  setTheme: (theme: Theme) => void
  resolvedTheme: 'light' | 'dark'
}

const getInitialTheme = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') return 'light'
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'system',
      resolvedTheme: getInitialTheme(),
      setTheme: (theme) => {
        const root = window.document.documentElement
        root.classList.remove('light', 'dark')

        let resolved: 'light' | 'dark'
        if (theme === 'system') {
          resolved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        } else {
          resolved = theme
        }

        root.classList.add(resolved)
        set({ theme, resolvedTheme: resolved })
      },
    }),
    {
      name: 'theme-storage',
      onRehydrateStorage: () => (state) => {
        if (state) {
          const root = window.document.documentElement
          root.classList.remove('light', 'dark')

          let resolved: 'light' | 'dark'
          if (state.theme === 'system') {
            resolved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
          } else {
            resolved = state.theme
          }

          root.classList.add(resolved)
          state.resolvedTheme = resolved
        }
      },
    }
  )
)

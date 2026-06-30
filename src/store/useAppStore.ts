import { create } from 'zustand'

interface AppState {
  scrollProgress: number
  activeSection: string
  activeAlert: number
  setScrollProgress: (p: number) => void
  setActiveSection: (s: string) => void
  setActiveAlert: (i: number) => void
}

export const useAppStore = create<AppState>((set) => ({
  scrollProgress: 0,
  activeSection: 'hero',
  activeAlert: 0,
  setScrollProgress: (p) => set({ scrollProgress: p }),
  setActiveSection: (s) => set({ activeSection: s }),
  setActiveAlert: (i) => set({ activeAlert: i }),
}))

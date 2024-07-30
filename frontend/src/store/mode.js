import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useMode = create(
  persist(
    (set, get) => ({
      mode: 'light',
      toggleMode: () => set({ mode: get().mode == 'light' ? 'dark' : 'light' }),
    }),
    {
      name: 'mode-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    },
  ),
)
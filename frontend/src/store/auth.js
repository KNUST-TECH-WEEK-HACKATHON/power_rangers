import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useAuth = create(
  persist(
    (set, get) => ({
      key: null,
      setKey: (key) => set({ key }),
      clearKey: (key) => set({ key: null }),
    }),
    {
      name: 'mode-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    },
  ),
)
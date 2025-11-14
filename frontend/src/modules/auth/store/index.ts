import { create } from "zustand"

import { persist, createJSONStorage } from "zustand/middleware"

import type { AuthStore } from "@/modules/auth/types"

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      auth: false,
      setAuth: (auth) => set({ auth }),
      logout: () => set({ auth: false })
    }),
    { name: "auth-storage", storage: createJSONStorage(() => localStorage) }
  )
)

export default useAuthStore

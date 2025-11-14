import { create } from "zustand"

import { persist, createJSONStorage } from "zustand/middleware"

import type { UserSettingStore } from "@/modules/settings/types/user"

const useUserSettingStore = create<UserSettingStore>()(
  persist(
    (set) => ({
      avatar: null,
      setAvatar: (avatar) => set({ avatar }),
      username: null,
      setUserName: (username) => set({ username }),
      email: null,
      setEmail: (email) => set({ email })
    }),
    {
      name: "user-setting-storage",
      storage: createJSONStorage(() => localStorage)
    }
  )
)

export default useUserSettingStore

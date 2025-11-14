import { create } from "zustand"

import { persist, createJSONStorage } from "zustand/middleware"

import type { PomodoroSettingStore } from "@/modules/settings/types/pomodoro"

const usePomodoroSettingStore = create<PomodoroSettingStore>()(
  persist(
    (set) => ({
      pomodoroDuration: 25,
      setPomodoroDuration: (pomodoroDuration) => set({ pomodoroDuration }),
      shortRelaxDuration: 5,
      setShortRelaxDuration: (shortRelaxDuration) =>
        set({ shortRelaxDuration }),
      longRelaxDuration: 15,
      setLongRelaxDuration: (longRelaxDuration) => set({ longRelaxDuration }),
      intervalLongRelax: 4,
      setIntervalLongRelax: (intervalLongRelax) => set({ intervalLongRelax })
    }),
    {
      name: "pomodoro-setting-storage",
      storage: createJSONStorage(() => localStorage)
    }
  )
)

export default usePomodoroSettingStore

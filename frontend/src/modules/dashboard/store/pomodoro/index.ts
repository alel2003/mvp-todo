import { create } from "zustand"

import { persist, createJSONStorage } from "zustand/middleware"

import type { TomatoHistoryStore } from "@/modules/dashboard/types/pomodoro"

const useTomatoHistoryStore = create<TomatoHistoryStore>()(
  persist(
    (set, get) => ({
      timeLeft: 25 * 60,
      setTimeLeft: (timeLeft) => set({ timeLeft }),
      isRunning: false,
      setIsRunning: (isRunning) => set({ isRunning }),
      toggleIsRunning: () => set({ isRunning: !get().isRunning }),
      minutes: 0,
      setMinutes: (minutes) => set({ minutes }),
      seconds: 0,
      setSeconds: (seconds) => set({ seconds }),
      mode: "work",
      setMode: (mode) => set({ mode }),
      intervalShortRelax: 0,
      incrementIntervalShortRelax: () =>
        set((state) => ({
          intervalShortRelax: (state.intervalShortRelax ?? 0) + 1
        })),

      resetIntervalShortRelax: () => set({ intervalShortRelax: 0 }),
      tick: () => {
        const { timeLeft } = get()
        if (timeLeft <= 1) {
          set({ timeLeft: 0, isRunning: false })
        } else {
          set({ timeLeft: timeLeft - 1 })
        }
      }
    }),
    {
      name: "tomato-history-storage",
      storage: createJSONStorage(() => localStorage)
    }
  )
)

export default useTomatoHistoryStore

import { useMemo } from "react"

import type { modeType } from "@/modules/dashboard/types/pomodoro"

export function useTimerMetrics(
  mode: modeType,
  timeLeft: number,
  durs: {
    pomodoro: number
    short: number
    long: number
  }
) {
  const total = useMemo(() => {
    switch (mode) {
      case "work":
        return durs.pomodoro * 60
      case "shortBreak":
        return durs.short * 60
      case "longBreak":
        return durs.long * 60
      default:
        return durs.pomodoro * 60
    }
  }, [mode, durs.pomodoro, durs.short, durs.long])

  const percentage = useMemo(
    () =>
      total > 0 ? Math.min(100, Math.max(0, (timeLeft / total) * 100)) : 0,
    [timeLeft, total]
  )

  const displayTime = useMemo(() => {
    const mm = String(Math.floor(timeLeft / 60)).padStart(2, "0")
    const ss = String(timeLeft % 60).padStart(2, "0")
    return `${mm}:${ss}`
  }, [timeLeft])

  return { total, percentage, displayTime }
}

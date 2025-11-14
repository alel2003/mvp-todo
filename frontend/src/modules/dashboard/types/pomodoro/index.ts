export type modeType = "work" | "shortBreak" | "longBreak"

export interface TomatoHistoryStore {
  timeLeft: number
  isRunning: boolean
  minutes: number
  seconds: number
  mode: modeType
  intervalShortRelax: number

  setTimeLeft: (timeLeft: number) => void
  setIsRunning: (isRunning: boolean) => void
  toggleIsRunning: () => void
  setMinutes: (minutes: number) => void
  setSeconds: (seconds: number) => void
  setMode: (mode: modeType) => void
  incrementIntervalShortRelax: () => void
  resetIntervalShortRelax: () => void
  tick: () => void
}

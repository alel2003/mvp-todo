export interface PomodoroSetting {
  pomodoroDuration: number
  shortRelaxDuration: number
  longRelaxDuration: number
  intervalLongRelax: number
}

export interface PomodoroSettingStore {
  pomodoroDuration: number
  shortRelaxDuration: number
  longRelaxDuration: number
  intervalLongRelax: number
  setPomodoroDuration: (pomodoroDuration: number) => void
  setShortRelaxDuration: (shortRelaxDuration: number) => void
  setLongRelaxDuration: (longRelaxDuration: number) => void
  setIntervalLongRelax: (intervalLongRelax: number) => void
}

export interface SettingPomodoroSelectProps {
  title: string
  value: number
  setValue: (value: number) => void
  type: string
}

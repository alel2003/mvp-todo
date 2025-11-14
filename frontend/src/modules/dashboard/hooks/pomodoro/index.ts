import { useEffect, useMemo } from "react"

import axios from "axios"

import usePomodoroSettingStore from "@/modules/settings/store/pomodoro"
import useTomatoHistoryStore from "@/modules/dashboard/store/pomodoro"

import useTaskStore from "@/modules/dashboard/store/task"

import { TASKS } from "@/modules/dashboard/services/api/task"

import { useTimerMetrics } from "@/modules/dashboard/hooks/timer"

import type { TomatoHistory } from "@/modules/dashboard/types/task"

import { toastError, toastSuccess } from "@/shared/utils/toast"

export function usePomodoroController() {
  const {
    pomodoroDuration,
    shortRelaxDuration,
    longRelaxDuration,
    intervalLongRelax
  } = usePomodoroSettingStore()

  const {
    setTimeLeft,
    isRunning,
    timeLeft,
    setIsRunning,
    setMode,
    mode,
    intervalShortRelax,
    incrementIntervalShortRelax,
    resetIntervalShortRelax,
    tick,
    toggleIsRunning
  } = useTomatoHistoryStore()

  const { taskIdPomodoro, tasks } = useTaskStore()

  const activeTaskTitle = useMemo(
    () => tasks.find((task) => task.id === taskIdPomodoro)?.title ?? null,
    [tasks, taskIdPomodoro]
  )

  const { total, percentage, displayTime } = useTimerMetrics(mode, timeLeft, {
    pomodoro: pomodoroDuration,
    short: shortRelaxDuration,
    long: longRelaxDuration
  })

  useEffect(() => {
    const duration = total
    if (duration > 0) {
      setTimeLeft(duration)
    }
  }, [mode, setTimeLeft, total])

  useEffect(() => {
    if (!isRunning) return

    let timer: ReturnType<typeof setInterval> | null = setInterval(() => {
      tick()
    }, 1000)

    return () => {
      if (timer) clearInterval(timer)
      timer = null
    }
  }, [isRunning, tick])

  const sendPomodoroCompletion = async () => {
    try {
      const entry: TomatoHistory = {
        endTimePomodoro: timeLeft,
        pomodoroDuration,
        mode
      }

      if (taskIdPomodoro) {
        const { status } = await TASKS.update(taskIdPomodoro, {
          tomatoHistory: [entry]
        })
        if (status === 200) {
          toastSuccess("Pomodoro successfully updated")
        }
      }
    } catch (error) {
      console.error("Data submission error", error)

      if (axios.isAxiosError(error)) {
        toastError("Failed to update pomodoro")
      }
    }
  }

  function resetTimer() {
    setIsRunning(false)
    const intervalLongRealaxBool = intervalShortRelax === intervalLongRelax
    if (mode) {
      if (mode === "work") {
        sendPomodoroCompletion()

        setTimeLeft(
          intervalLongRealaxBool
            ? longRelaxDuration * 60
            : shortRelaxDuration * 60
        )
        setMode(intervalLongRealaxBool ? "longBreak" : "shortBreak")

        if (intervalLongRealaxBool) {
          resetIntervalShortRelax()
        } else {
          incrementIntervalShortRelax()
        }
      } else if (mode === "shortBreak") {
        setTimeLeft(pomodoroDuration * 60)
        setMode("work")
      } else if (mode === "longBreak") {
        setTimeLeft(pomodoroDuration * 60)
        setMode("work")
      } else {
        setTimeLeft(pomodoroDuration * 60)
        setMode("work")
      }
    }
  }

  return {
    taskIdPomodoro,
    activeTaskTitle,
    isRunning,
    timeLeft,
    mode,
    percentage,
    displayTime,
    toggleIsRunning,
    resetTimer
  }
}

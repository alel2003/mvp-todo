import { useNavigate } from "react-router-dom"

import "react-circular-progressbar/dist/styles.css"

import DashboardPomodoroBig from "@/modules/dashboard/components/molecules/pomodoro/big"

import { usePomodoroController } from "@/modules/dashboard/hooks/pomodoro"

export default function DashboardPomodoroPage() {
  const navigate = useNavigate()

  const {
    activeTaskTitle,
    percentage,
    displayTime,
    resetTimer
  } = usePomodoroController()

  const handleBackFromBig = () => {
    navigate('/dashboard?dateType=today')
  }

  return (
    <DashboardPomodoroBig
      activeTaskTitle={activeTaskTitle}
      setIsTaskPomodoro={handleBackFromBig}
      resetTimer={resetTimer}
      percentage={percentage}
      displayTime={displayTime}
    />
  )
}

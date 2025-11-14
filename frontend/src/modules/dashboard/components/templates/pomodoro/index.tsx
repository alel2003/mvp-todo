import useTaskStore from "@/modules/dashboard/store/task"

import DashboardPomodoroSmall from "@/modules/dashboard/components/molecules/pomodoro/small"

import { usePomodoroController } from "@/modules/dashboard/hooks/pomodoro"

export default function PomodoroMain() {
  const { isTaskPomodoro, setIsTaskPomodoro } = useTaskStore()
  const { activeTaskTitle, resetTimer } = usePomodoroController()

  return (
    <>
      {isTaskPomodoro && (
        <DashboardPomodoroSmall
          activeTaskTitle={activeTaskTitle}
          resetTimer={resetTimer}
          setIsTaskPomodoro={setIsTaskPomodoro}
        />
      )}
    </>
  )
}

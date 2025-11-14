import useTaskStore from "@/modules/dashboard/store/task"

import { useQueryTaskParams } from "@/modules/dashboard/hooks/query"

import DashboardHero from "@/modules/dashboard/components/templates/hero"
import DashboardCreateTask from "@/modules/dashboard/components/templates/create-task"
import Tasks from "@/modules/dashboard/components/templates/tasks"

import PomodoroMain from "@/modules/dashboard/components/templates/pomodoro"

export default function DashboardPage() {
  const { isCompletedParamBool } = useQueryTaskParams()
  const { taskIdPomodoro } = useTaskStore()

  return (
    <div className="flex h-full flex-col gap-3 px-5">
      <DashboardHero />
      {!isCompletedParamBool && <DashboardCreateTask />}
      <Tasks />
      {!isCompletedParamBool && taskIdPomodoro !== null && <PomodoroMain />}
    </div>
  )
}

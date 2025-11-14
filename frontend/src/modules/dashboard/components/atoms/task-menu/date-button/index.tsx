import { useState } from "react"

import { toastSuccess } from "@/shared/utils/toast"

import { TASKS } from "@/modules/dashboard/services/api/task"

import { useQueryTaskParams } from "@/modules/dashboard/hooks/query"
import { useFilteredTasks } from "@/modules/dashboard/hooks/tasks"

import useTaskStore from "@/modules/dashboard/store/task"

import type { TaskMenuDateButtonProps } from "@/modules/dashboard/types/task"

import { handleError } from "@/shared/utils/error-handler"

import { ERROR_TASK_MESSAGES } from "@/modules/dashboard/constants/task"

export default function TaskMenuDateButton({
  id,
  title,
  date,
  dateType
}: TaskMenuDateButtonProps) {
  const { isDateType } = useQueryTaskParams()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { setTaskUpdateById, setTaskIdPomodoro } = useTaskStore()
  const { getFilteredTasks } = useFilteredTasks()

  const handleClick = async () => {
    try {
      setIsLoading(true)
      const { status } = await TASKS.update(id, { date, dateType })

      if (status === 200) {
        setTaskUpdateById(
          id,
          { dateType },
          false,
          isDateType === "all" ? "today" : isDateType
        )

        // Обновляем список задач после успешного обновления
        await getFilteredTasks()

        toastSuccess("Date successfully updated")
        setTaskIdPomodoro(null)
      }
    } catch (error) {
      handleError(error, ERROR_TASK_MESSAGES)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className="w-full cursor-pointer rounded px-2 py-1 text-left hover:bg-gray-100">
      {title}
    </button>
  )
}

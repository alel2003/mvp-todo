import { useState } from "react"

import { toastSuccess } from "@/shared/utils/toast"

import { TASKS } from "@/modules/dashboard/services/api/task"

import useTaskStore from "@/modules/dashboard/store/task"

import { handleError } from "@/shared/utils/error-handler"

import { ERROR_TASK_MESSAGES } from "@/modules/dashboard/constants/task"

import type { TaskMenuDeleteButtonProps } from "@/modules/dashboard/types/task"

export default function TaskMenuDeleteButton({
  id
}: TaskMenuDeleteButtonProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { setTaskDeleteById, setTaskIdPomodoro } = useTaskStore()

  const handleDelete = async () => {
    try {
      setIsLoading(true)
      const { status } = await TASKS.delete(id)
      if (status === 200) {
        setTaskDeleteById(id)

        toastSuccess("Task successfully deleted")
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
      onClick={handleDelete}
      disabled={isLoading}
      className="w-full cursor-pointer rounded px-2 py-1 text-left hover:bg-gray-100">
      Delete Task
    </button>
  )
}

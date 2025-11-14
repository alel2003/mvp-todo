import { useCallback } from "react"

import axios from "axios"

import { TASKS } from "@/modules/dashboard/services/api/task"

import useTaskStore from "@/modules/dashboard/store/task"

import { useQueryTaskParams } from "@/modules/dashboard/hooks/query"

import { handleError } from "@/shared/utils/error-handler"

import { ERROR_TASK_MESSAGES } from "@/modules/dashboard/constants/task"

export function useFilteredTasks() {
  const { isDateType, isCompletedParamBool, parsedProjectId } =
    useQueryTaskParams()

  const { setTasks } = useTaskStore()

  const getFilteredTasks = useCallback(async () => {
    try {
      const { data } = await TASKS.getFiltered(
        parsedProjectId !== null
          ? {
              project_id: parsedProjectId,
              is_completed: false,
              date_type: isDateType
            }
          : isCompletedParamBool
            ? { is_completed: true }
            : { is_completed: false, date_type: isDateType }
      )
      setTasks(data)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status
        if (status === 500) {
          setTasks([])
        }
      }
      handleError(error, ERROR_TASK_MESSAGES)
    }
  }, [isDateType, isCompletedParamBool, parsedProjectId, setTasks])

  return { getFilteredTasks }
}

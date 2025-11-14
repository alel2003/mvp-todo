import { useState } from "react"

import { v4 as uuidv4 } from "uuid"

import { useForm } from "react-hook-form"

import { toastSuccess } from "@/shared/utils/toast"

import { Plus } from "lucide-react"

import type { SubmitHandler } from "react-hook-form"

import useTaskStore from "@/modules/dashboard/store/task"

import { TASKS } from "@/modules/dashboard/services/api/task"

import { useQueryTaskParams } from "@/modules/dashboard/hooks/query"

import type { Task } from "@/modules/dashboard/types/task"

import { handleError } from "@/shared/utils/error-handler"

import { ERROR_TASK_MESSAGES } from "@/modules/dashboard/constants/task"

import { formatDateForDjango } from "@/modules/dashboard/utils/date-format"

import { getTodayAndTomorrow } from "@/modules/dashboard/utils/date"

export default function DashboardTaskCreateForm() {
  const { isDateType, parsedProjectId } = useQueryTaskParams()

  const { setCreateTask } = useTaskStore()

  const [, setIsLoading] = useState<boolean>(false)

  const { today, tomorrow, inThreeDays } = getTodayAndTomorrow()

  const dateTypes = {
    today: formatDateForDjango(today),
    tomorrow: formatDateForDjango(tomorrow),
    week: formatDateForDjango(inThreeDays),
    planned: formatDateForDjango(today),
    default: formatDateForDjango(today)
  } as const

  const { handleSubmit, register, reset } = useForm<Partial<Task>>({
    defaultValues: {
      title: ""
    }
  })

  const onSubmitAddedTask: SubmitHandler<Partial<Task>> = async (data) => {
    try {
      setIsLoading(true)
      const uuid = uuidv4()
      const { status } = await TASKS.post({
        id: uuid,
        title: data.title,
        date: isDateType === "all" ? dateTypes.default : dateTypes[isDateType],
        projectId: parsedProjectId,
        dateType: isDateType
      })
      if (status === 201) {
        setCreateTask({
          ...data,
          id: uuid,
          date:
            isDateType === "all" ? dateTypes.default : dateTypes[isDateType],
          dateType: isDateType
        })
        toastSuccess("Task create")
      }
      reset()
    } catch (error) {
      console.error("Error submit create", error)
      handleError(error, ERROR_TASK_MESSAGES)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmitAddedTask)}
      className="flex justify-between">
      <div className="flex w-full items-center gap-3">
        <button type="submit" className="cursor-pointer">
          <Plus color="gray" strokeWidth={1.5} />
        </button>
        <input
          {...register("title", {
            required: "Title is required"
          })}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault()
              handleSubmit(onSubmitAddedTask)()
            }
          }}
          className="w-full border-none outline-none"
          type="text"
          placeholder="Add a task"
        />
      </div>
    </form>
  )
}

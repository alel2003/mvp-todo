import { useEffect, useRef, useState } from "react"

import { toastSuccess } from "@/shared/utils/toast"

import { Controller, useForm } from "react-hook-form"

import { Play } from "lucide-react"

import { TASKS } from "@/modules/dashboard/services/api/task"

import { useQueryTaskParams } from "@/modules/dashboard/hooks/query"

import useTaskStore from "@/modules/dashboard/store/task"

import type { Task, TaskUpdateFormProps } from "@/modules/dashboard/types/task"

import { handleError } from "@/shared/utils/error-handler"

import { ERROR_TASK_MESSAGES } from "@/modules/dashboard/constants/task"

export default function TaskUpdateForm({
  setIsActiveTaskLeftMenu,
  isCompleted,
  title,
  dateType,
  id,
  menuRef
}: TaskUpdateFormProps) {
  const formRef = useRef<HTMLFormElement | null>(null)

  const {
    setTaskIdPomodoro,
    setIsTaskPomodoro,
    setTaskUpdateById,
    taskIdPomodoro
  } = useTaskStore()

  const { isCompletedParamBool } = useQueryTaskParams()

  const [, setIsLoading] = useState<boolean>(false)
  const { handleSubmit, control } = useForm<Partial<Task>>({
    defaultValues: { isCompleted: isCompleted }
  })

  const onSubmitUpdateTask = async (id: string, data: Partial<Task>) => {
    try {
      setIsLoading(true)
      const { status } = await TASKS.update(id, data)
      if (status === 200) {
        setTaskUpdateById(
          id,
          { isCompleted: data.isCompleted },
          isCompletedParamBool
        )
      }
      if (data.isCompleted) {
        toastSuccess("Task successfully marked as completed")
      }
    } catch (error) {
      console.error("Error submit update task", error)
      handleError(error, ERROR_TASK_MESSAGES)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    function handleDocumentClick(event: MouseEvent) {
      const target = event.target as HTMLElement
      const isClickInsideMenu = menuRef.current?.contains(target)
      const isClickInsideSelect =
        target.closest('[data-slot="select-content"]') !== null
      const isClickOnSelectTrigger =
        target.closest('[data-slot="select-trigger"]') !== null
      const isClickInsidePomodoro = target.closest(".pomodoro--bg") !== null

      if (
        !isClickInsideMenu &&
        !isClickInsideSelect &&
        !isClickOnSelectTrigger
      ) {
        setIsActiveTaskLeftMenu(false)
      }
      if (
        formRef.current &&
        !formRef.current.contains(target) &&
        !isClickInsidePomodoro
      ) {
        setTaskIdPomodoro(null)
      }
    }

    document.addEventListener("click", handleDocumentClick)
    return () => document.removeEventListener("click", handleDocumentClick)
  }, [setTaskIdPomodoro, setIsActiveTaskLeftMenu, menuRef])

  return (
    <form
      ref={formRef}
      onClick={(e) => {
        e.stopPropagation()
        e.preventDefault()
        setTaskIdPomodoro(id)
      }}
      onContextMenu={(e) => {
        e.preventDefault()
        setTaskIdPomodoro(id)
        setIsActiveTaskLeftMenu(true)
      }}
      className={`border ${taskIdPomodoro === id ? "border-red-500" : "border-transparent"} flex items-center justify-between rounded bg-white px-3 py-2 shadow-sm`}>
      <div className="flex items-center gap-3">
        {!isCompletedParamBool && (
          <button
            type="button"
            onClick={() => {
              setIsTaskPomodoro(true)
              setTaskIdPomodoro(id)
            }}
            className="flex cursor-pointer items-center justify-center rounded-full border border-red-500 p-1">
            <Play color="red" strokeWidth={2} size={13} />
          </button>
        )}

        <Controller
          name="isCompleted"
          control={control}
          render={({ field }) => (
            <input
              type="checkbox"
              checked={field.value}
              onChange={(e) => {
                field.onChange(e.target.checked)
                handleSubmit((data) => onSubmitUpdateTask(id, data))()
              }}
              className="rounded-full"
            />
          )}
        />
        <h5>{title}</h5>
      </div>
      <div>{dateType}</div>
    </form>
  )
}

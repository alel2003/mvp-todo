import { useState } from "react"

import { toastSuccess } from "@/shared/utils/toast"

import { useForm, type SubmitHandler } from "react-hook-form"

import { Button } from "@/shared/lib/shadcn/ui/button"
import { Input } from "@/shared/lib/shadcn/ui/input"

import useTaskStore from "@/modules/dashboard/store/task"

import type { Task, TaskTitleFormProps } from "@/modules/dashboard/types/task"

import { TASKS } from "@/modules/dashboard/services/api/task"

import { useFilteredTasks } from "@/modules/dashboard/hooks/tasks"

import { handleError } from "@/shared/utils/error-handler"

import { ERROR_TASK_MESSAGES } from "@/modules/dashboard/constants/task"

import ErrorMessage from "@/shared/components/ui/error"

export default function TaskTitleForm({
  id,
  setIsFormTitleUi
}: TaskTitleFormProps) {
  const { setTaskUpdateById } = useTaskStore()

  const { getFilteredTasks } = useFilteredTasks()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<Partial<Task>>({
    defaultValues: {
      title: ""
    }
  })

  const onSubmit: SubmitHandler<Partial<Task>> = async (data) => {
    try {
      setIsLoading(true)
      const { status } = await TASKS.update(id, { title: data.title })

      if (status === 200) {
        setTaskUpdateById(id, { title: data.title }, false)
        toastSuccess("Task successfully changed")
        setIsFormTitleUi(false)
        await getFilteredTasks()
      }
    } catch (error) {
      handleError(error, ERROR_TASK_MESSAGES)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="fixed top-0 right-0 bottom-0 left-0 z-10 flex items-center justify-center bg-black/70">
      <div className="flex flex-col gap-3 rounded-[4px] bg-white p-5 shadow-md">
        <h5 className="text-center font-medium">Change the task title</h5>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-1">
            <Input
              id="title"
              type="title"
              placeholder="заголовок задачи"
              {...register("title", {
                required: "Password is required"
              })}
            />
            {errors.title && <ErrorMessage message={errors.title.message} />}
          </div>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            <Button onClick={() => setIsFormTitleUi(false)}>Cancel</Button>
            <Button type="submit">
              {isLoading ? "Dispatch" : "Отправить"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  )
}

import { useState } from "react"

import { toastSuccess } from "@/shared/utils/toast"

import { useForm, type SubmitHandler } from "react-hook-form"

import { Button } from "@/shared/lib/shadcn/ui/button"

import useTaskStore from "@/modules/dashboard/store/task"

import type { Task, TaskNoteFormProps } from "@/modules/dashboard/types/task"

import { TASKS } from "@/modules/dashboard/services/api/task"

import { handleError } from "@/shared/utils/error-handler"

import { ERROR_TASK_MESSAGES } from "@/modules/dashboard/constants/task"

import ErrorMessage from "@/shared/components/ui/error"

export default function TaskNoteForm({
  id,
  setIsFormNoteUi
}: TaskNoteFormProps) {
  const { setTaskUpdateById } = useTaskStore()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors }
  } = useForm<Partial<Task>>({
    defaultValues: {
      note: ""
    }
  })

  const onSubmit: SubmitHandler<Partial<Task>> = async (data) => {
    try {
      setIsLoading(true)
      const { status } = await TASKS.update(id, { note: data.note })

      if (status === 200) {
        setTaskUpdateById(id, { note: data.note }, false)
        toastSuccess("Задача успешно изменена")
        reset()
        setIsFormNoteUi(false)
      }
    } catch (error) {
      handleError(error, ERROR_TASK_MESSAGES)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="absolute top-0 right-0 bottom-0 left-0 z-10 flex items-center justify-center bg-black/70">
      <div className="flex flex-col gap-3 rounded-[4px] bg-white p-5 shadow-md">
        <h5 className="text-center font-medium">Edit Note</h5>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-1">
            <textarea
              placeholder="Task note"
              {...register("note", {
                required: "Password is required"
              })}
            />
            {errors.note && <ErrorMessage message={errors.note.message} />}
          </div>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            <Button onClick={() => setIsFormNoteUi(false)}>Cancel</Button>
            <Button type="submit">
              {isLoading ? "Dispatch" : "Отправить"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  )
}

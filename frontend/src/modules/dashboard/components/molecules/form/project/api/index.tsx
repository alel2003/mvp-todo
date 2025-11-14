import { useForm } from "react-hook-form"

import { Input } from "@/shared/lib/shadcn/ui/input"
import { Button } from "@/shared/lib/shadcn/ui/button"

import ErrorMessage from "@/shared/components/ui/error"

import type {
  Project,
  DashboardProjectApiFormProps
} from "@/modules/dashboard/types/project"

export default function DashboardProjectApiForm({
  defaultValues,
  onSubmit,
  onCancel,
  isLoading
}: DashboardProjectApiFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Partial<Project>>({ defaultValues })

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-1">
        <Input
          id="title"
          type="title"
          placeholder="New project name"
          {...register("title", {
            required: "project name is required"
          })}
        />
        {errors.title && <ErrorMessage message={errors.title.message} />}
      </div>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        <Button onClick={onCancel}>Cancel</Button>
        <Button type="submit"> {isLoading ? "Dispatch" : "Send"}</Button>
      </div>
    </form>
  )
}

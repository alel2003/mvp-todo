import { useState } from "react"

import { Play } from "lucide-react"

import { toastSuccess } from "@/shared/utils/toast"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/shared/lib/shadcn/ui/select"

import { TASKS } from "@/modules/dashboard/services/api/task"

import { useTaskProjects } from "@/modules/dashboard/hooks/project"
import { useFilteredTasks } from "@/modules/dashboard/hooks/tasks"

import useTaskStore from "@/modules/dashboard/store/task"

import { handleError } from "@/shared/utils/error-handler"

import { ERROR_TASK_MESSAGES } from "@/modules/dashboard/constants/task"

import type { TaskMenuProjectProps } from "@/modules/dashboard/types/task"

export default function TaskMenuProject({
  id,
  projectId
}: TaskMenuProjectProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { projects } = useTaskProjects()
  const { setTaskUpdateById } = useTaskStore()
  const { getFilteredTasks } = useFilteredTasks()

  const currentProjectId = projectId ?? "none"
  const currentProjectTitle =
    projects.find((p) => p.id === projectId)?.title || "Task has no project"

  const handleProjectChange = async (newProjectId: string) => {
    try {
      setIsLoading(true)
      const projectIdToUpdate = newProjectId === "none" ? null : newProjectId

      const { status } = await TASKS.update(id, {
        projectId: projectIdToUpdate
      })
      if (status === 200) {
        setTaskUpdateById(id, { projectId: projectIdToUpdate }, false)

        await getFilteredTasks()

        toastSuccess(
          projectIdToUpdate === null
            ? "Project removed from task"
            : "Task's project has been changed"
        )
      }
    } catch (error) {
      handleError(error, ERROR_TASK_MESSAGES)
    } finally {
      setIsLoading(false)
    }
  }

  if (!projects || projects.length === 0) {
    return null
  }

  return (
    <div className="group relative flex w-full">
      <button
        disabled={isLoading}
        className="flex w-full cursor-pointer items-center gap-2 rounded px-2 py-1 text-left hover:bg-gray-100">
        <span>Project</span>
        <Play size={15} />
      </button>
      <div className="pointer-events-none absolute -right-45 rounded-lg border bg-white opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
        <Select value={currentProjectId} onValueChange={handleProjectChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={currentProjectTitle} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">Remove project</SelectItem>
            {projects.map(({ id, title }) => (
              <SelectItem key={id} value={id}>
                {title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

import { useState } from "react"

import { toastSuccess } from "@/shared/utils/toast"

import { PROJECTS } from "@/modules/dashboard/services/api/project"

import useProjectApiStore from "@/modules/dashboard/store/project/api"
import useProjectUIStore from "@/modules/dashboard/store/project/ui"

import { handleError } from "@/shared/utils/error-handler"

import { ERROR_PROJECT_MESSAGES } from "@/modules/dashboard/constants/project"

export default function DashboardProjectUIForm() {
  const { setProjectDeleteById } = useProjectApiStore()

  const { setIsFormProject, setIsFormProjectTypeUI, isActiveProjectId } =
    useProjectUIStore()

  const [, setIsLoading] = useState<boolean>(false)

  async function onSubmitDeleteProject() {
    try {
      setIsLoading(true)

      if (isActiveProjectId !== null) {
        const { status } = await PROJECTS.delete(isActiveProjectId)
        if (status === 200) {
          setProjectDeleteById(isActiveProjectId)

          toastSuccess("Project successfully deleted")
        }
      }
    } catch (error) {
      console.error("Failed to delete project", error)
      handleError(error, ERROR_PROJECT_MESSAGES)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col border-t bg-white px-3 py-2">
      <button
        onClick={(e) => {
          e.stopPropagation()
          setIsFormProjectTypeUI("update")
          setIsFormProject(true)
        }}
        className="rounded px-2 py-2 text-left hover:bg-gray-50">
        Edit Project
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation()
          onSubmitDeleteProject()
        }}
        className="rounded px-2 py-2 text-left text-red-600 hover:bg-gray-50">
        Complete project
      </button>
    </div>
  )
}

import { useState } from "react"

import { v4 as uuidv4 } from "uuid"

import { toastSuccess } from "@/shared/utils/toast"

import { PROJECTS } from "@/modules/dashboard/services/api/project"

import useProjectApiStore from "@/modules/dashboard/store/project/api"
import useProjectUIStore from "@/modules/dashboard/store/project/ui"

import type { Project } from "@/modules/dashboard/types/project"

import { handleError } from "@/shared/utils/error-handler"

import { ERROR_PROJECT_MESSAGES } from "@/modules/dashboard/constants/project"

import DashboardProjectApiForm from "@/modules/dashboard/components/molecules/form/project/api"

export default function DashboardCreateProject() {
  const { isFormProjectTypeUI, isActiveProjectId, setIsFormProject } =
    useProjectUIStore()
  const { setCreateProject, setProjectUpdateById } = useProjectApiStore()
  const [isLoading, setIsLoading] = useState(false)

  const defaultValues = {
    title: ""
  }

  const onSubmit = async (data: Partial<Project>) => {
    setIsLoading(true)
    try {
      const uuid = uuidv4()
      const isUpdate = isFormProjectTypeUI === "update" && isActiveProjectId
      const { status } = isUpdate
        ? await PROJECTS.update(isActiveProjectId, { title: data.title })
        : await PROJECTS.post({ id: uuid, title: data.title })

      if ((isUpdate && status === 200) || (!isUpdate && status === 201)) {
        let message
        if (isUpdate) {
          setProjectUpdateById(isActiveProjectId, { title: data.title })
          message = "Project updated"
        } else {
          setCreateProject({ id: uuid, title: data.title })
          message = "Project created"
        }
        toastSuccess(message)
        setIsFormProject(false)
      }
    } catch (error) {
      handleError(error, ERROR_PROJECT_MESSAGES)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="absolute top-0 right-0 bottom-0 left-0 z-10 flex items-center justify-center bg-black/70">
      <div className="flex flex-col gap-3 rounded-[4px] bg-white p-5 shadow-md">
        <h5 className="text-center font-medium">Add a project</h5>
        <DashboardProjectApiForm
          defaultValues={defaultValues}
          onSubmit={onSubmit}
          onCancel={() => setIsFormProject(false)}
          isLoading={isLoading}
        />
      </div>
    </section>
  )
}

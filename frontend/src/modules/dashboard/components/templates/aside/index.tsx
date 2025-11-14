import { FolderPlus } from "lucide-react"

import { useTaskProjects } from "@/modules/dashboard/hooks/project"

import useProjectUIStore from "@/modules/dashboard/store/project/ui"

import DashboardStaticLink from "@/modules/dashboard/components/molecules/link/static"
import DashboardProjectLink from "@/modules/dashboard/components/molecules/link/project"
import DashboardProjectUIForm from "@/modules/dashboard/components/molecules/form/project/ui"

import { ASIDE_LIST } from "@/modules/dashboard/constants"

export default function DashboardAside() {
  const { projects } = useTaskProjects()

  const { setIsFormProjectTypeUI, setIsFormProject, isActiveProjectId } =
    useProjectUIStore()

  function handleCreateProject() {
    setIsFormProjectTypeUI("create")
    setIsFormProject(true)
  }

  return (
    <aside className="flex h-full flex-col justify-between bg-white/70 py-5 shadow-md">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col">
          {ASIDE_LIST.map((link) => (
            <DashboardStaticLink key={link.to} {...link} />
          ))}
        </div>

        {projects && projects.length > 0 && (
          <div className="border-t border-gray-300 py-3">
            <h5 className="px-5 font-medium">Project</h5>
            <div className="flex flex-col">
              {projects.map((project) => (
                <div key={project.id}>
                  <DashboardProjectLink {...project} />
                  {isActiveProjectId === project.id && (
                    <DashboardProjectUIForm />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <button
        onClick={handleCreateProject}
        className="flex cursor-pointer items-center gap-3 px-5 pt-5 inset-shadow-2xs md:px-10">
        <FolderPlus color="gray" strokeWidth={1.5} />
        <h5 className="text-gray-500">Add project</h5>
      </button>
    </aside>
  )
}

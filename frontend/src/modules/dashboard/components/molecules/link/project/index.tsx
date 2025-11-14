import { Link } from "react-router-dom"

import useProjectUIStore from "@/modules/dashboard/store/project/ui"

import type { Project } from "@/modules/dashboard/types/project"

export default function DashboardProjectLink({ id, title }: Partial<Project>) {
  const { isActiveProjectId, setIsActiveProjectId } = useProjectUIStore()
  return (
    <Link
      to={`/dashboard?projectId=${id}&dateType=all`}
      onContextMenu={(e) => {
        e.preventDefault()
        setIsActiveProjectId(id)
      }}
      className={`flex items-center gap-3 px-5 py-3 transition-all duration-300 md:px-10 ${
        isActiveProjectId === id ? "border-l-4 border-blue-500 bg-blue-50" : ""
      }`}>
      <h5>{title}</h5>
    </Link>
  )
}

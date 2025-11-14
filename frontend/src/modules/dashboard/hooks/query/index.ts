import { useSearchParams } from "react-router-dom"

import type { dateType } from "@/modules/dashboard/types/task"

export const useQueryTaskParams = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const isDateType = searchParams.get("dateType") as dateType
  const projectId = searchParams.get("projectId") as string
  const parsedProjectId = projectId ? projectId : null
  const isCompletedParamBool = searchParams.get("isCompleted") === "true"

  return {
    searchParams,
    setSearchParams,
    isDateType,
    parsedProjectId,
    isCompletedParamBool
  }
}

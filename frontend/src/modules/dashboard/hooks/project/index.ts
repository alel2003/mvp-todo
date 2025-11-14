import { useEffect } from "react"

import { PROJECTS } from "@/modules/dashboard/services/api/project"

import useProjectApiStore from "@/modules/dashboard/store/project/api"

export function useTaskProjects() {
  const { projects, setProjects } = useProjectApiStore()

  useEffect(() => {
    async function getProjects() {
      try {
        const { data } = await PROJECTS.get()
        setProjects(data)
      } catch (error) {
        console.error("Error fetching projects", error)
      }
    }
    getProjects()
  }, [setProjects])

  return { projects }
}

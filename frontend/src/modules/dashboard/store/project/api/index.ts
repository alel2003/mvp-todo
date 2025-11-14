import { create } from "zustand"

import { persist, createJSONStorage } from "zustand/middleware"

import type { ProjectStore } from "@/modules/dashboard/types/project"

const useProjectApiStore = create<ProjectStore>()(
  persist(
    (set) => ({
      projects: [],
      setProjects: (projects) => set({ projects }),
      setCreateProject: (project) =>
        set((state) => ({
          projects: [...state.projects, project]
        })),
      setProjectUpdateById: (id, updatedProject) =>
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === id ? { ...project, ...updatedProject } : project
          )
        })),
      setProjectDeleteById: (id) =>
        set((state) => ({
          projects: state.projects.filter((project) => project.id !== id)
        }))
    }),
    { name: "project-storage", storage: createJSONStorage(() => localStorage) }
  )
)

export default useProjectApiStore

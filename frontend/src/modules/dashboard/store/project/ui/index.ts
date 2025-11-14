import { create } from "zustand"

import type { ProjectUIStore } from "@/modules/dashboard/types/project"

const useProjectUIStore = create<ProjectUIStore>((set) => ({
  isFormProject: false,
  setIsFormProject: (isFormProject) => set({ isFormProject }),

  isFormProjectTypeUI: "create",
  setIsFormProjectTypeUI: (isFormProjectTypeUI) => set({ isFormProjectTypeUI }),

  isActiveProjectId: null,
  setIsActiveProjectId: (isActiveProjectId) => set({ isActiveProjectId })
}))

export default useProjectUIStore

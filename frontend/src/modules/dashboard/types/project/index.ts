import type { Task } from "@/modules/dashboard/types/task"

export type ProjectFormUiType = "create" | "update"

export interface Project {
  id: string
  slug: string
  title: string
  color: string
  isDelete: string
  tasks: Task[]
}

export interface AddedProjectProps {
  projectId?: string | null
  isFormTypeUI: ProjectFormUiType
  setIsProject: (value: boolean) => void
}

export interface ProjectStore {
  projects: Partial<Project>[]

  setProjects: (project: Partial<Project>[]) => void
  setCreateProject: (project: Partial<Project>) => void
  setProjectUpdateById: (id: string, updatedProject: Partial<Project>) => void
  setProjectDeleteById: (id: string) => void
}

export interface DashboardProjectLinkProps {
  project: Partial<Project>
  onClick: () => void
  isActive?: boolean
}

export interface DashboardProjectUIFormProps {
  project: Partial<Project>
  setIsFormTypeUI: (value: ProjectFormUiType) => void
  setProjectId: (value: string | null) => void
  setIsProject: (value: boolean) => void
  onClose: () => void
}

export interface ProjectUIStore {
  isFormProject: boolean
  isFormProjectTypeUI: ProjectFormUiType
  isActiveProjectId: string | null

  setIsFormProject: (isFormProject: boolean) => void
  setIsFormProjectTypeUI: (isFormProjectTypeUI: ProjectFormUiType) => void
  setIsActiveProjectId: (isActiveProjectId: string) => void
}

export interface DashboardProjectApiFormProps {
  defaultValues?: Partial<Project>
  onSubmit: (data: Partial<Project>) => void
  onCancel?: () => void
  isLoading?: boolean
}

export interface PomodoroProps {
  resetTimer: () => void
  setIsTaskPomodoro: (value: boolean) => void
  activeTaskTitle: string | null
}

export interface DashboardPomodoroBigProps extends PomodoroProps {
  percentage: number
  displayTime: string
}

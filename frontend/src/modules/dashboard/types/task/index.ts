import type { modeType } from "@/modules/dashboard/types/pomodoro"

export type dateType = "today" | "tomorrow" | "week" | "planned" | "all"
export type priorityType = "low" | "medium" | "hight" | "critical"

export interface Task {
  id: string
  slug: string
  title: string
  date: string
  note: string
  isCompleted: boolean
  countTomatoes: number
  priority: priorityType
  isDelete: boolean
  tomatoHistory: TomatoHistory[]
  dateType: dateType
  projectId: string | null
}

export interface TomatoHistory {
  endTimePomodoro: number
  pomodoroDuration: number
  mode: modeType
}

export interface TaskFilter {
  is_completed: boolean
  priority?: priorityType
  date_type?: dateType
  project_id?: string
}

export interface TaskStore {
  tasks: Partial<Task>[]

  taskIdPomodoro: string | null
  isTaskPomodoro: boolean

  setTasks: (task: Partial<Task>[]) => void
  setCreateTask: (task: Partial<Task>) => void
  setTaskUpdateById: (
    id: string,
    updatedTask: Partial<Task>,
    isCompletedParamBool?: boolean,
    dateType?: dateType
  ) => void
  setTaskDeleteById: (id: string) => void

  setTaskIdPomodoro: (taskIdPomodoro: string | null) => void
  setIsTaskPomodoro: (isTaskPomodoro: boolean) => void
}

export interface TaskTitleFormProps {
  id: string
  setIsFormTitleUi: (value: boolean) => void
}

export interface TaskNoteFormProps {
  id: string
  setIsFormNoteUi: (value: boolean) => void
}

export interface TaskUpdateFormProps {
  setIsActiveTaskLeftMenu: (value: boolean) => void
  isCompleted: boolean
  title: string
  dateType: dateType
  id: string
  menuRef: React.RefObject<HTMLDivElement | null>
}

export interface TaskMenuCalendarProps {
  id: string
  date: string
}

export interface TaskMenuEditTitleButtonProps {
  setIsFormTitleUi: (value: boolean) => void
}

export interface TaskMenuEditNoteButtonProps {
  setIsFormNoteUi: (value: boolean) => void
}

export interface TaskMenuDateButtonProps {
  id: string
  title: string
  date: string
  dateType: dateType
}

export interface TaskMenuProjectProps {
  id: string
  projectId: string | null
}

export interface TaskMenuDeleteButtonProps {
  id: string
}

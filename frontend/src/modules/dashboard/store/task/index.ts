import { create } from "zustand"

import { persist, createJSONStorage } from "zustand/middleware"

import type { TaskStore } from "@/modules/dashboard/types/task"

const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: [],
      setTasks: (tasks) => set({ tasks }),
      setCreateTask: (task) =>
        set((state) => ({
          tasks: [...state.tasks, task]
        })),
      setTaskUpdateById: (id, updatedTask, isCompletedParamBool, dateType) =>
        set((state) => ({
          tasks: state.tasks
            .map((task) =>
              task.id === id ? { ...task, ...updatedTask } : task
            )
            .filter((task) => {
              if (task.id !== id) return true
              if (
                (!isCompletedParamBool && updatedTask.isCompleted) ||
                dateType === updatedTask.dateType
              )
                return false
              if (isCompletedParamBool && !updatedTask.isCompleted) return false
              return true
            })
        })),
      setTaskDeleteById: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id)
        })),
      taskIdPomodoro: null,
      setTaskIdPomodoro: (taskIdPomodoro) => set({ taskIdPomodoro }),
      isTaskPomodoro: false,
      setIsTaskPomodoro: (isTaskPomodoro) => set({ isTaskPomodoro })
    }),
    { name: "task-storage", storage: createJSONStorage(() => localStorage) }
  )
)

export default useTaskStore

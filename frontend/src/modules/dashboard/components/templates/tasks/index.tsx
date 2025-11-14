import { useEffect } from "react"

import useTaskStore from "@/modules/dashboard/store/task"

import { useFilteredTasks } from "@/modules/dashboard/hooks/tasks"

import Task from "@/modules/dashboard/components/molecules/task"

export default function Tasks() {
  const { tasks } = useTaskStore()
  const { getFilteredTasks } = useFilteredTasks()

  useEffect(() => {
    getFilteredTasks()
  }, [getFilteredTasks])

  return (
    <section>
      {tasks && tasks.length > 0 ? (
        <div className="flex flex-col gap-3">
          <h5 className="font-medium">Tasks:</h5>
          <div className="flex flex-col gap-3">
            {tasks.map((task) => (
              <Task key={task.id} {...task} />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          There are no tasks
        </div>
      )}
    </section>
  )
}

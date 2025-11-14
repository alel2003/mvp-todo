import { useState } from "react"

import { Play } from "lucide-react"

import { toastSuccess } from "@/shared/utils/toast"

import {
  startOfWeek,
  endOfWeek,
  isToday,
  isTomorrow,
  isWithinInterval
} from "date-fns"

import { Calendar } from "@/shared/lib/shadcn/ui/calendar"

import { TASKS } from "@/modules/dashboard/services/api/task"

import { useQueryTaskParams } from "@/modules/dashboard/hooks/query"

import useTaskStore from "@/modules/dashboard/store/task"

import { formatDateForDjango } from "@/modules/dashboard/utils/date-format"
import { getTodayAndTomorrow } from "@/modules/dashboard/utils/date"
import { handleError } from "@/shared/utils/error-handler"

import { useFilteredTasks } from "@/modules/dashboard/hooks/tasks"

import type {
  dateType,
  TaskMenuCalendarProps
} from "@/modules/dashboard/types/task"

import { ERROR_TASK_MESSAGES } from "@/modules/dashboard/constants/task"

export default function TaskMenuCalendar({ id, date }: TaskMenuCalendarProps) {
  const { isDateType } = useQueryTaskParams()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [dateCalendar, setDateCalendar] = useState<Date | string>(date)

  const { setTaskUpdateById, setTaskIdPomodoro } = useTaskStore()

  const { getFilteredTasks } = useFilteredTasks()
  const { today } = getTodayAndTomorrow()

  const handleSelect = async (selectedDate: Date | undefined) => {
    if (!selectedDate) return

    setDateCalendar(selectedDate)
    const formattedDate = formatDateForDjango(selectedDate)

    try {
      setIsLoading(true)
      const weekStart = startOfWeek(today, { weekStartsOn: 1 })
      const weekEnd = endOfWeek(today, { weekStartsOn: 1 })

      let dateType: dateType

      if (isToday(selectedDate)) {
        dateType = "today"
      } else if (isTomorrow(selectedDate)) {
        dateType = "tomorrow"
      } else if (
        isWithinInterval(selectedDate, { start: weekStart, end: weekEnd })
      ) {
        dateType = "week"
      } else {
        dateType = "planned"
      }

      const { status } = await TASKS.update(id, {
        dateType,
        date: formattedDate
      })
      if (status === 200) {
        setTaskUpdateById(
          id,
          { date: formattedDate, dateType },
          false,
          isDateType
        )
        await getFilteredTasks()

        setTaskIdPomodoro(null)

        toastSuccess("Date successfully updated")
      }
    } catch (error) {
      handleError(error, ERROR_TASK_MESSAGES)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="group relative flex">
      <button
        disabled={isLoading}
        className="flex w-full cursor-pointer items-center gap-2 rounded px-2 py-1 text-left hover:bg-gray-100">
        <span>Set selected date</span>
        <Play size={15} />
      </button>
      <Calendar
        mode="single"
        selected={dateCalendar}
        onSelect={handleSelect}
        className="pointer-events-none absolute -right-62 rounded-lg border opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:opacity-100"
      />
    </div>
  )
}

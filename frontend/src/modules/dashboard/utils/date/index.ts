import { addDays } from "date-fns"

export function getTodayAndTomorrow() {
  const today = new Date()
  const tomorrow = addDays(today, 1)
  const inThreeDays = addDays(today, 3)

  return { today, tomorrow, inThreeDays }
}

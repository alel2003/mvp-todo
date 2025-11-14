import { useEffect, useRef, useState } from "react"

import DashboardTaskCreateForm from "@/modules/dashboard/components/molecules/form/task/create"

export default function DashboardCreateTask() {
  const [isActiveTask, setIsActiveTask] = useState<boolean>(false)
  const wrapperRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsActiveTask(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <section
      ref={wrapperRef}
      className={`border ${isActiveTask ? "border-red-500" : "border-transparent"} rounded-[4px] bg-white px-3 py-2 shadow-md`}
      onClick={() => setIsActiveTask(true)}>
      <DashboardTaskCreateForm />
    </section>
  )
}

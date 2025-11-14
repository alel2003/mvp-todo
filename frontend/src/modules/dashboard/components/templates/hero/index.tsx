import { useQueryTaskParams } from "@/modules/dashboard/hooks/query"

import { TITLE_OBJECT } from "@/modules/dashboard/constants"

export default function DashboardHero() {
  const { isDateType } = useQueryTaskParams()
  return (
    <section className="flex flex-col gap-5">
      <h1 className="text-[25px] font-medium">
        {isDateType ? TITLE_OBJECT[isDateType] : "Completed"}
      </h1>
    </section>
  )
}

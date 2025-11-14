import { Link } from "react-router-dom"

import { useQueryTaskParams } from "@/modules/dashboard/hooks/query"

import type { DashboardStaticLinkProps } from "@/modules/dashboard/types"

export default function DashboardStaticLink({
  to,
  title,
  icon,
  type
}: DashboardStaticLinkProps) {
  const { isDateType } = useQueryTaskParams()

  return (
    <Link
      to={to}
      key={title}
      className={`flex items-center gap-3 px-5 py-3 transition-all duration-300 md:px-10 ${isDateType === type ? "bg-gray-200 text-black" : "bg-transparent text-gray-600"} font-medium`}>
      <span>{icon}</span>
      <h5>{title}</h5>
    </Link>
  )
}

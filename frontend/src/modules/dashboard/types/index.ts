import type { ReactNode } from "react"

import type { dateType } from "./task"

export interface DashboardStaticLinkProps {
  to: string
  title: string
  icon: ReactNode
  type: dateType
}

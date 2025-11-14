import { createElement } from "react"

import {
  Sun,
  Sunset,
  CalendarRange,
  CalendarCheck,
  BadgeCheck
} from "lucide-react"

export const ASIDE_LIST = [
  {
    title: "Today",
    to: "/dashboard?dateType=today",
    icon: createElement(Sun, { strokeWidth: 1.5, color: "#FFB534" }),
    type: "today"
  },
  {
    title: "Tomorrow",
    to: "/dashboard?dateType=tomorrow",
    icon: createElement(Sunset, { strokeWidth: 1.5, color: "#E62727" }),
    type: "tomorrow"
  },
  {
    title: "For this week",
    to: "/dashboard?dateType=week",
    icon: createElement(CalendarRange, { strokeWidth: 1.5, color: "#9112BC" }),
    type: "week"
  },
  {
    title: "Planned",
    to: "/dashboard?dateType=planned",
    icon: createElement(CalendarCheck, { strokeWidth: 1.5, color: "#3396D3" }),
    type: "planned"
  },
  {
    title: "Completed",
    to: "/dashboard?dateType=all&isCompleted=true",
    icon: createElement(BadgeCheck, { strokeWidth: 1.5, color: "#78C841" }),
    type: "all"
  }
] as const

export const TITLE_OBJECT = {
  today: "Today",
  tomorrow: "Tomorrow",
  week: "For this week",
  planned: "Planned",
  all: "All"
} as const

import { Play, Pause, X, SquareArrowOutUpRight } from "lucide-react"

import useTomatoHistoryStore from "@/modules/dashboard/store/pomodoro"

import type { PomodoroProps } from "@/modules/dashboard/types/project"

import { useNavigate } from "react-router-dom"

export default function DashboardPomodoroSmall({
  resetTimer,
  activeTaskTitle
}: PomodoroProps) {
  const { isRunning, toggleIsRunning, timeLeft } = useTomatoHistoryStore()
  const navigate = useNavigate()

  return (
    <section className="absolute right-0 bottom-5 left-0 flex items-center justify-center">
      <div className="pomodoro--bg flex flex-col gap-3 rounded-[4px] py-2">
        <div className="flex items-center px-2">
          <button
            onClick={(e) => {
              e.stopPropagation()
              navigate(`/dashboard/pomodoro`)
            }}
            className="cursor-pointer text-white">
            <SquareArrowOutUpRight />
          </button>
          <h5 className="mx-auto text-center font-medium text-white">
            {activeTaskTitle}
          </h5>
        </div>
        <div className="flex items-center gap-3 px-10">
          <div className="rounded-[4px] border border-white px-3">
            <span className="text-[20px] text-white">
              {String(Math.floor(timeLeft / 60)).padStart(2, "0")}
            </span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation()
              toggleIsRunning()
            }}
            className="cursor-pointer rounded-[4px] border border-white p-1">
            <span className="text-white">
              {isRunning ? <Pause /> : <Play />}
            </span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              resetTimer()
            }}
            className="cursor-pointer rounded-[4px] border border-white p-1 text-white">
            <X />
          </button>
        </div>
      </div>
    </section>
  )
}

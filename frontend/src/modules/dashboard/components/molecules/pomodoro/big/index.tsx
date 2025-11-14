import { CornerDownLeft } from "lucide-react"

import { buildStyles, CircularProgressbar } from "react-circular-progressbar"

import useTomatoHistoryStore from "@/modules/dashboard/store/pomodoro"

import type { DashboardPomodoroBigProps } from "@/modules/dashboard/types/project"

import { MODE_TITLES } from "@/modules/dashboard/constants/pomodoro"

export default function DashboardPomodoroBig({
  percentage,
  displayTime,
  setIsTaskPomodoro,
  resetTimer,
  activeTaskTitle
}: DashboardPomodoroBigProps) {
  const { isRunning, mode, toggleIsRunning } = useTomatoHistoryStore()

  return (
    <section className="pomodoro--bg absolute top-0 right-0 bottom-0 left-0 flex h-screen flex-col gap-10 px-4 py-10 md:px-20 md:py-20">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          setIsTaskPomodoro(false)
        }}
        className="w-fit cursor-pointer rounded-[4px] border border-white p-2">
        <CornerDownLeft color="white" />
      </button>

      <div className="flex h-full flex-col items-center justify-center gap-6">
        <h1 className="text-2xl font-bold text-white">
          {MODE_TITLES[mode]}: <span>{activeTaskTitle}</span>
        </h1>

        <div className="h-[250px] w-[250px]">
          <CircularProgressbar
            value={percentage}
            text={displayTime}
            styles={buildStyles({
              textColor: "white",
              pathColor: mode === "work" ? "#ef4444" : "#10b981",
              trailColor: "#1e293b",
              textSize: "16px"
            })}
          />
        </div>

        <div className="flex gap-4">
          <button
            onClick={(e) => {
              e.stopPropagation()
              toggleIsRunning()
            }}
            className="cursor-pointer rounded-lg border-2 border-red-500 bg-red-500 px-8 py-3 text-lg font-medium text-white transition-colors hover:bg-red-600">
            {isRunning ? "Stop" : "Start"}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              resetTimer()
            }}
            className="cursor-pointer rounded-lg border-2 border-gray-500 bg-gray-500 px-6 py-3 text-lg font-medium text-white transition-colors hover:bg-gray-600">
            End
          </button>
        </div>
      </div>
    </section>
  )
}

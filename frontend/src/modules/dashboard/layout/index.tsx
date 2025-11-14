import { useEffect } from "react"

import { Toaster } from "sonner"

import { Navigate, Outlet, useLocation } from "react-router-dom"

import { POMODORO_SETTING } from "@/modules/settings/services/api/pomodoro"

import useAuthStore from "@/modules/auth/store"
import usePomodoroSettingStore from "@/modules/settings/store/pomodoro"

import DashboardCreateProject from "@/modules/dashboard/components/templates/project"

import DashboardNavbar from "@/modules/dashboard/components/templates/navbar"
import DashboardAside from "@/modules/dashboard/components/templates/aside"

import useProjectUIStore from "@/modules/dashboard/store/project/ui"

export default function AuthGuardLayout() {
  const { auth } = useAuthStore()

  const location = useLocation()

  const { isFormProject } = useProjectUIStore()

  const {
    setPomodoroDuration,
    setShortRelaxDuration,
    setLongRelaxDuration,
    setIntervalLongRelax
  } = usePomodoroSettingStore()

  useEffect(() => {
    async function getPomodoroSetting() {
      try {
        const { data } = await POMODORO_SETTING.get()
        setPomodoroDuration(data.pomodoroDuration)
        setShortRelaxDuration(data.shortRelaxDuration)
        setLongRelaxDuration(data.longRelaxDuration)
        setIntervalLongRelax(data.intervalLongRelax)
      } catch (error) {
        console.log("Error response user", error)
      }
    }
    getPomodoroSetting()
  }, [
    setPomodoroDuration,
    setShortRelaxDuration,
    setLongRelaxDuration,
    setIntervalLongRelax
  ])

  if (!auth) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />
  }

  return (
    <>
      <div className="flex min-h-screen flex-col bg-[#F9F9F9]">
        <DashboardNavbar />
        <div className="grid flex-1 grid-cols-[1fr_4fr]">
          <DashboardAside />
          <div className="h-full py-5">
            <Outlet />
          </div>
        </div>
      </div>
      {isFormProject && <DashboardCreateProject />}
      <Toaster richColors closeButton />
    </>
  )
}

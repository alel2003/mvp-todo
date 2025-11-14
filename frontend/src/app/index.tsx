import { lazy } from "react"

import { BrowserRouter, Routes, Route } from "react-router-dom"

import AuthGuardLayout from "@/modules/dashboard/layout"
import RedirectIfAuth from "@/modules/dashboard/router"

const DashboardPage = lazy(() => import("@/pages/dashboard"))
const DashboardSettings = lazy(() => import("@/pages/dashboard/settings"))
const DashboardPomodoroPage = lazy(() => import("@/pages/dashboard/pomodoro"))
const AuthPage = lazy(() => import("@/pages/auth"))
const NotFoundPage = lazy(() => import("@/pages/not-found"))

const App = () => {
  return (
    <BrowserRouter>
      <RedirectIfAuth />
      <Routes>
        <Route element={<AuthGuardLayout />}>
          <Route path="/dashboard">
            <Route index element={<DashboardPage />} />
            <Route path="settings" element={<DashboardSettings />} />
            <Route path="pomodoro" element={<DashboardPomodoroPage />} />
          </Route>
        </Route>

        <Route path="/sign-in" element={<AuthPage />} />
        <Route path="/sign-up" element={<AuthPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

import { useEffect } from "react"

import { useNavigate, useLocation } from "react-router-dom"

import useAuthStore from "@/modules/auth/store"

const RedirectIfAuth = () => {
  const { auth } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!auth) {
      if (!["/sign-in", "/sign-up"].includes(location.pathname)) {
        navigate("/sign-in", { replace: true })
      }
      return
    }

    const guestPaths = ["/", "/sign-in", "/sign-up"]
    if (guestPaths.includes(location.pathname)) {
      if (
        !location.search.includes("dateType") ||
        !location.search.includes("isCompleted")
      ) {
        navigate("/dashboard?dateType=today", { replace: true })
      }
    }
  }, [auth, location.pathname, location.search, navigate])

  return null
}

export default RedirectIfAuth

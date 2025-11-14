import { useEffect } from "react"

import { Link } from "react-router-dom"

import { Settings } from "lucide-react"

import useUserSettingStore from "@/modules/settings/store/user"

import { USER } from "@/modules/settings/services/api/user"

import Avatar from "@/modules/dashboard/components/atoms/avatar"

export default function DashboardNavbar() {
  const { setAvatar, username, setUserName, email, setEmail } =
    useUserSettingStore()

  useEffect(() => {
    async function getUser() {
      try {
        const { data } = await USER.get()
        setAvatar(data.avatar ?? null)
        setUserName(data.username)
        setEmail(data.email)
      } catch (error) {
        console.log("Error response user", error)
      }
    }
    getUser()
  }, [setAvatar, setUserName, setEmail])

  return (
    <nav className="relative bg-white/70 py-5 shadow-md">
      <div className="custom-container flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar />
          <h5 className="text-[16px] font-medium text-black md:text-[18px]">
            {username === null ? email : username}
          </h5>
        </div>
        <Link
          to="/dashboard/settings"
          state={{ background: location.pathname }}
          className="cursor-pointer">
          <Settings strokeWidth={1.5} size={30} color="black" />
        </Link>
      </div>
    </nav>
  )
}

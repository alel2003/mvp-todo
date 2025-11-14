import { Link } from "react-router-dom"

import { X } from "lucide-react"

import SettingPomodoroForm from "@/modules/settings/components/molecules/pomodoro-form"
import SettingUserForm from "@/modules/settings/components/molecules/user-form"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/shared/lib/shadcn/ui/tabs"

export default function SettingMain() {
  return (
    <div
      aria-modal="true"
      className="absolute top-0 right-0 bottom-0 left-0 flex h-screen items-center justify-center bg-black/50">
      <div className="h-fit w-full rounded-[4px] bg-white shadow-md md:h-[500px] md:w-[700px]">
        <div className="flex items-center gap-5 px-5 py-5 shadow-md">
          <h5 className="w-full text-center text-[20px] font-normal">
            Settings
          </h5>
          <Link to="/dashboard?dateType=today" className="cursor-pointer">
            <X strokeWidth={1.5} size={30} />
          </Link>
        </div>
        <Tabs
          defaultValue="pomodoro"
          className="flex w-full flex-col items-center justify-center gap-5 px-5 py-5">
          <TabsList>
            <TabsTrigger value="pomodoro">Pomodoro Timer</TabsTrigger>
            <TabsTrigger value="user">Account</TabsTrigger>
          </TabsList>
          <TabsContent value="pomodoro">
            <SettingPomodoroForm />
          </TabsContent>
          <TabsContent value="user">
            <SettingUserForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

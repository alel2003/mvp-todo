import SettingUserAvatar from "@/modules/settings/components/atoms/avatar"
import SettingUserUsername from "@/modules/settings/components/atoms/username"
import SettingUserEmail from "@/modules/settings/components/atoms/email"
import SettingUserPassword from "@/modules/settings/components/atoms/password"
import SettingUserManagement from "@/modules/settings/components/atoms/management"

export default function SettingUserForm() {
  return (
    <div className="flex flex-col gap-3">
      <SettingUserAvatar />
      <SettingUserUsername />
      <SettingUserEmail />
      <SettingUserPassword />
      <SettingUserManagement />
    </div>
  )
}

import { Input } from "@/shared/lib/shadcn/ui/input"

import { USER } from "@/modules/settings/services/api/user"

import useUserSettingStore from "@/modules/settings/store/user"

import { ERROR_USER_SETTINGS_MESSAGES } from "@/modules/settings/constants/user"

import { handleError } from "@/shared/utils/error-handler"
import { toastSuccess } from "@/shared/utils/toast"

export default function SettingUserUsername() {
  const { username, setUserName, email } = useUserSettingStore()

  async function handleUsernameUpdate(
    e: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (e.key !== "Enter") return

    e.preventDefault()
    const value = (e.target as HTMLInputElement).value.trim()

    const trimmed = value.trim()

    if (!trimmed || trimmed === username) return

    try {
      const { status } = await USER.update({ username: trimmed })

      if (status === 200) {
        setUserName(trimmed)
        toastSuccess("Username updated!")
      }
    } catch (error) {
      handleError(error, ERROR_USER_SETTINGS_MESSAGES)
    }
  }

  return (
    <div className="grid grid-cols-[1fr_2fr] items-center gap-3">
      <h5 className="text-gray-400">Username</h5>
      <Input
        defaultValue={username ?? email ?? ""}
        onKeyDown={(e) => handleUsernameUpdate(e)}
      />
    </div>
  )
}

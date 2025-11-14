import useAuthStore from "@/modules/auth/store"

import { USER } from "@/modules/settings/services/api/user"

import { Button } from "@/shared/lib/shadcn/ui/button"

import { ERROR_USER_SETTINGS_MESSAGES } from "@/modules/settings/constants/user"

import { handleError } from "@/shared/utils/error-handler"
import { toastSuccess } from "@/shared/utils/toast"

export default function SettingUserManagement() {
  const { logout, setAuth } = useAuthStore()

  async function deleteUser() {
    try {
      const { status } = await USER.delete()

      if (status === 200) {
        toastSuccess("User successfully deleted!")

        setAuth(false)
      }
    } catch (error) {
      handleError(error, ERROR_USER_SETTINGS_MESSAGES)
    }
  }

  return (
    <div className="grid grid-cols-[1fr_2fr] items-center gap-3">
      <h5 className="text-gray-400">Account management</h5>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <Button onClick={deleteUser} variant="outline">
          Delete account
        </Button>
        <Button onClick={logout} variant="outline">
          Logout
        </Button>
      </div>
    </div>
  )
}

import { useForm, type SubmitHandler } from "react-hook-form"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger
} from "@/shared/lib/shadcn/ui/dialog"

import { Button } from "@/shared/lib/shadcn/ui/button"
import { Label } from "@/shared/lib/shadcn/ui/label"
import { Input } from "@/shared/lib/shadcn/ui/input"

import { USER } from "@/modules/settings/services/api/user"

import useAuthStore from "@/modules/auth/store"

import ErrorMessage from "@/shared/components/ui/error"

import type { FormValuesPassword } from "@/modules/settings/types/user"

import { ERROR_USER_SETTINGS_MESSAGES } from "@/modules/settings/constants/user"

import { handleError } from "@/shared/utils/error-handler"
import { toastError, toastSuccess } from "@/shared/utils/toast"


export default function SettingUserPassword() {

  const { logout } = useAuthStore()

  const {
    handleSubmit: handleSubmitPassword,
    register: registerPassword,
    formState: { errors: errorsPassword }
  } = useForm<FormValuesPassword>({
    defaultValues: {
      password: "",
      newPassword: "",
      repeatNewPassword: ""
    }
  })

  const onSubmitPassword: SubmitHandler<FormValuesPassword> = async (data) => {
    const { password, newPassword, repeatNewPassword } = data
    if (newPassword !== repeatNewPassword) {
      toastError("Passwords do not match!")
      return
    }

    try {
      const { status } = await USER.update({
        password,
        new_password: newPassword
      })

      if (status === 200) {
        toastSuccess("Password successfully updated!")
        logout()
      }
    } catch (error) {
      handleError(error, ERROR_USER_SETTINGS_MESSAGES)
    }
  }

  return (
    <div className="grid grid-cols-[1fr_2fr] items-center gap-3">
      <h5 className="text-gray-400">Password</h5>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Change password</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogTitle>Password change</DialogTitle>

          <form
            onSubmit={handleSubmitPassword(onSubmitPassword)}
            className="flex flex-col gap-3">
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="password">Current password</Label>
                <Input
                  id="password"
                  type="password"
                  {...registerPassword("password", {
                    required: "Password is required"
                  })}
                />
                {errorsPassword.password && (
                  <ErrorMessage message={errorsPassword.password.message} />
                )}
              </div>

              <div className="grid gap-3">
                <Label htmlFor="newPassword">New password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  {...registerPassword("newPassword", {
                    required: "New password is required"
                  })}
                />
                {errorsPassword.password && (
                  <ErrorMessage message={errorsPassword.password.message} />
                )}
              </div>

              <div className="grid gap-3">
                <Label htmlFor="repeatNewPassword">Repeat new password</Label>
                <Input
                  id="repeatNewPassword"
                  type="password"
                  {...registerPassword("repeatNewPassword", {
                    required: "repeatNewPassword is required"
                  })}
                />
                {errorsPassword.repeatNewPassword && (
                  <ErrorMessage
                    message={errorsPassword.repeatNewPassword.message}
                  />
                )}
              </div>
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Change password</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

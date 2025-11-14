import { toastSuccess } from "@/shared/utils/toast"

import { useForm, type SubmitHandler } from "react-hook-form"

import { USER } from "@/modules/settings/services/api/user"

import useUserSettingStore from "@/modules/settings/store/user"

import { Button } from "@/shared/lib/shadcn/ui/button"
import { Input } from "@/shared/lib/shadcn/ui/input"
import { Label } from "@/shared/lib/shadcn/ui/label"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
  DialogTitle
} from "@/shared/lib/shadcn/ui/dialog"

import useAuthStore from "@/modules/auth/store"

import ErrorMessage from "@/shared/components/ui/error"

import type { FormValuesEmail } from "@/modules/settings/types/user"

import { ERROR_USER_SETTINGS_MESSAGES } from "@/modules/settings/constants/user"

import { handleError } from "@/shared/utils/error-handler"

export default function SettingUserEmail() {
  const { email, setEmail } = useUserSettingStore()
  const { logout } = useAuthStore()

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<FormValuesEmail>({
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const onEmailSubmit: SubmitHandler<FormValuesEmail> = async (data) => {
    try {
      const { status } = await USER.update({ ...data })

      if (status === 200) {
        setEmail(data.email)
        toastSuccess("Success email update!")
        logout()
      }
    } catch (error) {
      handleError(error, ERROR_USER_SETTINGS_MESSAGES)
    }
  }

  return (
    <div className="grid grid-cols-[1fr_2fr] items-center gap-3">
      <h5 className="text-gray-400">Email</h5>
      <div className="flex items-center gap-5">
        <span className="block max-w-[200px] truncate">{email ?? "—"}</span>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Change email</Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[425px]">
            <DialogTitle>Email change</DialogTitle>

            <form
              onSubmit={handleSubmit(onEmailSubmit)}
              className="flex flex-col gap-3">
              <div className="grid gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="newEmail">New email</Label>
                  <Input
                    id="newEmail"
                    placeholder="new email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email format"
                      }
                    })}
                  />
                  {errors.email && (
                    <ErrorMessage message={errors.email.message} />
                  )}
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="password">Current password</Label>
                  <Input
                    id="password"
                    type="password"
                    {...register("password", {
                      required: "Password is required"
                    })}
                  />
                  {errors.password && (
                    <ErrorMessage message={errors.password.message} />
                  )}
                </div>
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" type="button">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit">Change email</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

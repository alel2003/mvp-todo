import { Controller, useForm } from "react-hook-form"

import { Input } from "@/shared/lib/shadcn/ui/input"

import { USER } from "@/modules/settings/services/api/user"

import useUserSettingStore from "@/modules/settings/store/user"

import Avatar from "@/modules/dashboard/components/atoms/avatar"

import type { FormValuesAvatar } from "@/modules/settings/types/user"

import { ERROR_USER_SETTINGS_MESSAGES } from "@/modules/settings/constants/user"

import { handleError } from "@/shared/utils/error-handler"
import { toastSuccess } from "@/shared/utils/toast"

export default function SettingUserAvatar() {
  const { setAvatar } = useUserSettingStore()

  const { control } = useForm<FormValuesAvatar>()

  async function onSubmitAvatar(data: FormValuesAvatar) {
    const avatar = data.avatar?.[0]
    if (!avatar) return

    const formData = new FormData()
    formData.append("avatar", avatar)

    try {
      const { status } = await USER.update(formData)

      if (status === 200) {
        setAvatar(URL.createObjectURL(avatar))

        toastSuccess("Avatar updated!")
      }
    } catch (error) {
      handleError(error, ERROR_USER_SETTINGS_MESSAGES)
    }
  }

  return (
    <div className="grid grid-cols-[1fr_2fr] items-center gap-3">
      <h5 className="text-gray-400">Avatar</h5>
      <div className="flex items-center gap-3">
        <Avatar />
        <Controller
          name="avatar"
          control={control}
          render={({ field: { onChange, ref } }) => {
            return (
              <Input
                className="w-fit"
                type="file"
                accept="image/*"
                ref={ref}
                onChange={(e) => {
                  const files = e.target.files
                  if (!files) return

                  onChange(files)
                  onSubmitAvatar({ avatar: files } as FormValuesAvatar)
                  e.target.value = ""
                }}
              />
            )
          }}
        />
      </div>
    </div>
  )
}

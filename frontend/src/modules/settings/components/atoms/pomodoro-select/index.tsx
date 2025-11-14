import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/shared/lib/shadcn/ui/select"

import { POMODORO_SETTING } from "@/modules/settings/services/api/pomodoro"

import type { SettingPomodoroSelectProps } from "@/modules/settings/types/pomodoro"

import {
  ERROR_POMODORO_MESSAGES,
  POMODORO_TIME
} from "@/modules/settings/constants/pomodoro"

import { handleError } from "@/shared/utils/error-handler"
import { toastSuccess } from "@/shared/utils/toast"

export default function SettingPomodoroSelect({
  title,
  value,
  setValue,
  type
}: SettingPomodoroSelectProps) {
  async function handleUpdate(key: string, value: number) {
    try {
      const { status } = await POMODORO_SETTING.update({ [key]: value })

      if (status === 200) {
        setValue(value)
        toastSuccess("Pomodoro settings updated !")
      }
    } catch (error) {
      handleError(error, ERROR_POMODORO_MESSAGES)
    }
  }

  return (
    <div className="grid grid-cols-[1fr_2fr] items-center gap-3">
      <h5 className="text-gray-400">{title}</h5>
      <Select
        value={String(value)}
        onValueChange={(val) => handleUpdate(type, Number(val))}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          {POMODORO_TIME.map((item) => (
            <SelectItem key={item} value={String(item)}>
              {item} Minutes
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

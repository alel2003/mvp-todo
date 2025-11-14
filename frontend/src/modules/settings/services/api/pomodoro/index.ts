import type { AxiosResponse } from "axios"

import { request } from "@/shared/services/api"

import type { PomodoroSetting } from "@/modules/settings/types/pomodoro"

export const POMODORO_SETTING = {
  get(): Promise<AxiosResponse<PomodoroSetting>> {
    return request.get("settings/")
  },
  update(data: Partial<PomodoroSetting>) {
    return request.put("settings/update/", data)
  }
}

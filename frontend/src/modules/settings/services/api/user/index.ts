import type { AxiosResponse } from "axios"

import { request } from "@/shared/services/api"

import type { User } from "@/modules/settings/types/user"

export const USER = {
  get(): Promise<AxiosResponse<User>> {
    return request.get("user/")
  },
  update(data: FormData | Partial<User>) {
    return request.patch("user/update/", data, {
      headers: {
        "Content-Type":
          data instanceof FormData ? "multipart/form-data" : "application/json"
      }
    })
  },
  delete() {
    return request.patch("user/delete/")
  }
}

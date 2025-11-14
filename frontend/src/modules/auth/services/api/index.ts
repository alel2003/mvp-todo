import type { AxiosResponse } from "axios"

import { request } from "@/shared/services/api"

import type { AuthData, AuthRes } from "@/modules/auth/types"

export const AUTH = {
  signIn(data: AuthData): Promise<AxiosResponse<AuthRes>> {
    return request.post("authentication/sign-in/", data)
  },
  signUp(data: AuthData): Promise<AxiosResponse<AuthRes>> {
    return request.post("authentication/sign-up/", data)
  },
  refreshToken(): Promise<AxiosResponse<AuthRes>> {
    return request.post("authentication/refresh/")
  }
}

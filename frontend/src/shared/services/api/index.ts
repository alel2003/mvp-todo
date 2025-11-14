import axios from "axios"

import useAuthStore from "@/modules/auth/store"

import { AUTH } from "@/modules/auth/services/api"

export const request = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
})

request.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response.status
    const errorConfig = error.config

    if (errorConfig.url?.includes("/refresh")) {
      useAuthStore.getState().logout()
      window.location.href = "/sign-in"
      return Promise.reject(error)
    }

    try {
      if (status === 401 && !errorConfig._retry) {
        errorConfig._retry = true
        await AUTH.refreshToken()
        return request(errorConfig)
      }
    } catch (error) {
      useAuthStore.getState().logout()
      window.location.href = "/sign-in"
      return Promise.reject(error)
    }

    return Promise.reject(error)
  }
)

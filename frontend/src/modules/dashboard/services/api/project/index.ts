import type { AxiosResponse } from "axios"

import { request } from "@/shared/services/api"

import type { Project } from "@/modules/dashboard/types/project"

export const PROJECTS = {
  get(): Promise<AxiosResponse<Project[]>> {
    return request.get("projects/")
  },
  getId(id: number): Promise<AxiosResponse<Project>> {
    return request.get(`projects/detail/${id}`)
  },
  post(data: Partial<Project>) {
    return request.post("projects/create/", data)
  },
  update(id: string, data: Partial<Project>) {
    return request.patch(`projects/update/${id}`, data)
  },
  delete(id: string) {
    return request.patch(`projects/delete/${id}`)
  }
}

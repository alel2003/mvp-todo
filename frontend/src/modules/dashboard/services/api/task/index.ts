import type { AxiosResponse } from "axios"

import { request } from "@/shared/services/api"

import type { Task, TaskFilter } from "@/modules/dashboard/types/task"

export const TASKS = {
  get(): Promise<AxiosResponse<Task[]>> {
    return request.get("tasks/")
  },
  getId(id: number): Promise<AxiosResponse<Task>> {
    return request.get(`tasks/detail/${id}`)
  },
  getFiltered(filters: TaskFilter): Promise<AxiosResponse<Task[]>> {
    return request.get("tasks/", { params: filters })
  },
  post(data: Partial<Task>) {
    return request.post("tasks/create/", data)
  },
  update(id: string, data: Partial<Task>) {
    return request.patch(`tasks/update/${id}`, data)
  },
  delete(id: string) {
    return request.patch(`tasks/delete/${id}`)
  }
}

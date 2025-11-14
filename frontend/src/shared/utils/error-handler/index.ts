import axios from "axios"

import { toastError } from "@/shared/utils/toast"

import type { ErrorMessages } from "@/shared/types"

export function handleError(
  error: unknown,
  errorMessages: ErrorMessages
): void {
  let message = errorMessages.DEFAULT

  if (axios.isAxiosError(error)) {
    const status = error.response?.status
    if (status && status in errorMessages) {
      message = errorMessages[status]
    }
  }

  toastError(message)
}

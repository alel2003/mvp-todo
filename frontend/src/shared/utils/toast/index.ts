import { toast } from "sonner"

export const toastSuccess = (message: string) =>
  toast.success(message, { style: { background: "#D1FAE5", color: "#065F46" } })

export const toastError = (message: string) =>
  toast.error(message, { style: { background: "#FEE2E2", color: "#991B1B" } })

import { Toaster } from "sonner"

import Navbar from "@/modules/auth/components/templates/navbar"
import AuthMain from "@/modules/auth/components/templates/main"

export default function AuthPage() {
  return (
    <div className="flex h-screen flex-col justify-between bg-[#F9F9F9]">
      <Toaster position="bottom-right" />
      <Navbar />
      <AuthMain />
    </div>
  )
}

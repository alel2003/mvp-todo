import { Link, useLocation } from "react-router-dom"

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/shared/lib/shadcn/ui/card"

import AuthForm from "@/modules/auth/components/molecules/form"

import type { AuthPageType } from "@/modules/auth/types"

import { AUTH_CONTENT } from "@/modules/auth/constants"

export default function AuthMain() {
  const location = useLocation()

  const authPage: AuthPageType =
    location.pathname === "/sign-in" ? "signIn" : "signUp"

  const { title, description, link, linkText } = AUTH_CONTENT[authPage]

  return (
    <main className="flex-1">
      <section className="custom-container py-[50px] md:py-[150px]">
        <Card className="mx-auto w-full rounded-[4px] bg-white md:max-w-[800px]">
          <CardHeader>
            <CardTitle className="text-[20px] text-black">{title}</CardTitle>
            <CardDescription className="text-[20px] text-black">
              {description}
            </CardDescription>
            <CardAction>
              <Link to={link} className="text-blac text-[20px] font-medium">
                {linkText}
              </Link>
            </CardAction>
          </CardHeader>

          <CardContent>
            <AuthForm />
          </CardContent>
        </Card>
      </section>
    </main>
  )
}

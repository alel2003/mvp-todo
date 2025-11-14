import { useState } from "react"

import { toastError, toastSuccess } from "@/shared/utils/toast"

import { useLocation, useNavigate } from "react-router-dom"

import { useForm } from "react-hook-form"

import type { SubmitHandler } from "react-hook-form"

import { AUTH } from "@/modules/auth/services/api"

import useAuthStore from "@/modules/auth/store"

import AuthField from "@/modules/auth/components/molecules/field"

import type { AuthData } from "@/modules/auth/types"

import { AUTH_FIELDS, ERROR_AUTH_MESSAGES } from "@/modules/auth/constants"

import { handleError } from "@/shared/utils/error-handler"

export default function AuthForm() {
  const { setAuth } = useAuthStore()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const navigate = useNavigate()
  const location = useLocation()

  const isSignUp = location.pathname === "/sign-up"

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<AuthData>({
    defaultValues: {
      email: "",
      password: "",
      repeatPassword: ""
    }
  })

  const onAuthSubmit: SubmitHandler<AuthData> = async (data) => {
    try {
      setIsLoading(true)

      if (isSignUp && data.password !== data.repeatPassword) {
        toastError("Passwords do not match !")
        return
      }

      const { email, password } = data

      if (isSignUp) {
        await AUTH.signUp({ email, password })
      } else {
        await AUTH.signIn({ email, password })
      }

      toastSuccess(
        isSignUp ? "Successfully registered!" : "Successfully logged in!"
      )

      setAuth(true)
      navigate("/dashboard?dateType=today", { replace: true })
    } catch (error) {
      console.error("Error during auth submit", error)
      handleError(error, ERROR_AUTH_MESSAGES)
    } finally {
      setIsLoading(false)
    }
  }

  const visibleFields = isSignUp
    ? AUTH_FIELDS
    : AUTH_FIELDS.filter((field) => field.input.value !== "repeatPassword")

  return (
    <form onSubmit={handleSubmit(onAuthSubmit)}>
      <div className="flex flex-col gap-6">
        {visibleFields.map(({ label, input }) => (
          <AuthField
            key={input.value}
            label={label}
            input={input}
            register={register}
            errors={errors}
          />
        ))}

        <button type="submit" className="auth__button" disabled={isLoading}>
          {isLoading ? "Loading..." : isSignUp ? "Sign Up" : "Sign In"}
        </button>
      </div>
    </form>
  )
}

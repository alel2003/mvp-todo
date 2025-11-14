import type { FieldErrors, UseFormRegister } from "react-hook-form"

export type AuthPageType = "signIn" | "signUp"

export interface AuthRes {
  access: string
  refresh: string
}

export interface AuthData {
  email: string
  password: string
  repeatPassword?: string
}

export interface AuthStore {
  auth: boolean
  setAuth: (auth: boolean) => void
  logout: () => void
}

export type AuthFieldProps = {
  label: {
    htmlFor: string
    title: string
  }
  input: {
    id: string
    type: string
    placeholder: string
    value: keyof AuthData
    requiredText: string
  }
  register: UseFormRegister<AuthData>
  errors: FieldErrors<AuthData>
}

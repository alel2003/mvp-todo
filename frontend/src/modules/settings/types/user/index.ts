export interface User {
  id: number
  email: string
  username: string
  avatar: string | null
  new_password?: string | null
  password?: string | null
}

export interface FormValuesAvatar {
  avatar: FileList
}

export interface FormValuesEmail {
  email: string
  password: string
}

export interface FormValuesPassword {
  password: string
  newPassword: string
  repeatNewPassword: string
}

export interface UserSettingStore {
  avatar: string | null
  username: string | null
  email: string | null
  setAvatar: (avatar: string | null) => void
  setUserName: (username: string) => void
  setEmail: (email: string) => void
}

import { CircleUserRound } from "lucide-react"

import useUserSettingStore from "@/modules/settings/store/user"

export default function Avatar() {
  const { avatar } = useUserSettingStore()
  return (
    <>
      {avatar === null ? (
        <CircleUserRound strokeWidth={1.5} size={30} color="black" />
      ) : (
        <img
          className="size-[40px] rounded-full object-cover object-center"
          src={
            avatar?.startsWith("blob:")
              ? avatar
              : `http://127.0.0.1:8000/${avatar}`
          }
          alt="avatar"
        />
      )}
    </>
  )
}

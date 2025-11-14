import useTaskStore from "@/modules/dashboard/store/task"

import type { TaskMenuEditNoteButtonProps } from "@/modules/dashboard/types/task"

export default function TaskMenuEditNoteButton({
  setIsFormNoteUi
}: TaskMenuEditNoteButtonProps) {
  const { setTaskIdPomodoro } = useTaskStore()

  const handleClick = () => {
    setIsFormNoteUi(true)
    setTaskIdPomodoro(null)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="w-full cursor-pointer rounded px-2 py-1 text-left hover:bg-gray-100">
      Edit note
    </button>
  )
}

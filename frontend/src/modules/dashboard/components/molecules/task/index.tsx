import { useState, useRef } from "react"

import { AnimatePresence, motion } from "framer-motion"

import { useQueryTaskParams } from "@/modules/dashboard/hooks/query"

import TaskTitleForm from "@/modules/dashboard/components/molecules/form/task/title"
import TaskNoteForm from "@/modules/dashboard/components/molecules/form/task/note"
import TaskUpdateForm from "@/modules/dashboard/components/molecules/form/task/update"

import TaskMenuEditTitleButton from "@/modules/dashboard/components/atoms/task-menu/edit-title-button"
// import TaskMenuEditNoteButton from "@/modules/dashboard/components/atoms/task-menu/edit-note-button"
import TaskMenuDateButton from "@/modules/dashboard/components/atoms/task-menu/date-button"
import TaskMenuCalendar from "@/modules/dashboard/components/atoms/task-menu/calendar"
import TaskMenuProject from "@/modules/dashboard/components/atoms/task-menu/project"
import TaskMenuDeleteButton from "@/modules/dashboard/components/atoms/task-menu/delete-button"

import type { Task } from "@/modules/dashboard/types/task"

import { formatDateForDjango } from "@/modules/dashboard/utils/date-format"
import { getTodayAndTomorrow } from "@/modules/dashboard/utils/date"

export default function Task({
  id,
  isCompleted,
  title,
  dateType,
  projectId,
  date
}: Task) {
  const { isCompletedParamBool } = useQueryTaskParams()
  const [isActiveTaskLeftMenu, setIsActiveTaskLeftMenu] =
    useState<boolean>(false)
  const [isFormTitleUi, setIsFormTitleUi] = useState<boolean>(false)
  const [isFormNoteUi, setIsFormNoteUi] = useState<boolean>(false)
  const menuRef = useRef<HTMLDivElement | null>(null)

  const { today, tomorrow } = getTodayAndTomorrow()

  const dateButtons = [
    {
      title: "Today",
      date: formatDateForDjango(today),
      dateType: "today" as const
    },
    {
      title: "Tomorrow",
      date: formatDateForDjango(tomorrow),
      dateType: "tomorrow" as const
    }
  ]

  return (
    <div className="relative">
      <TaskUpdateForm
        setIsActiveTaskLeftMenu={setIsActiveTaskLeftMenu}
        isCompleted={isCompleted}
        title={title}
        dateType={dateType}
        id={id}
        menuRef={menuRef}
      />
      {!isCompletedParamBool && (
        <AnimatePresence>
          {isActiveTaskLeftMenu && (
            <motion.div
              ref={menuRef}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.12 }}
              className="absolute z-10 -mt-5 ml-40 flex w-fit flex-col items-start gap-2 rounded-[4px] bg-white py-2 shadow-xl">
              <TaskMenuEditTitleButton setIsFormTitleUi={setIsFormTitleUi} />
              {/* <TaskMenuEditNoteButton setIsFormNoteUi={setIsFormNoteUi} /> */}
              {dateButtons.map(({ title, date, dateType }) => (
                <TaskMenuDateButton
                  key={dateType}
                  id={id}
                  title={title}
                  date={date}
                  dateType={dateType}
                />
              ))}
              <TaskMenuCalendar id={id} date={date} />
              <TaskMenuProject id={id} projectId={projectId} />
              <TaskMenuDeleteButton id={id} />
            </motion.div>
          )}
        </AnimatePresence>
      )}
      {isFormTitleUi && (
        <TaskTitleForm id={id} setIsFormTitleUi={setIsFormTitleUi} />
      )}
      {isFormNoteUi && (
        <TaskNoteForm id={id} setIsFormNoteUi={setIsFormNoteUi} />
      )}
    </div>
  )
}

import usePomodoroSettingStore from "@/modules/settings/store/pomodoro"

import SettingPomodoroSelect from "@/modules/settings/components/atoms/pomodoro-select"

export default function SettingPomodoroForm() {
  const {
    pomodoroDuration,
    shortRelaxDuration,
    longRelaxDuration,
    intervalLongRelax,
    setPomodoroDuration,
    setShortRelaxDuration,
    setLongRelaxDuration,
    setIntervalLongRelax
  } = usePomodoroSettingStore()

  const selectList = [
    {
      title: "Pomodoro duration",
      value: pomodoroDuration,
      setValue: setPomodoroDuration,
      type: "pomodoroDuration"
    },
    {
      title: "Short break",
      value: shortRelaxDuration,
      setValue: setShortRelaxDuration,
      type: "shortRelaxDuration"
    },
    {
      title: "Long break",
      value: longRelaxDuration,
      setValue: setLongRelaxDuration,
      type: "longRelaxDuration"
    },
    {
      title: "Long break interval",
      value: intervalLongRelax,
      setValue: setIntervalLongRelax,
      type: "intervalLongRelax"
    }
  ]
  return (
    <div className="flex flex-col gap-3">
      {selectList.map((select) => (
        <SettingPomodoroSelect key={select.type} {...select} />
      ))}
    </div>
  )
}

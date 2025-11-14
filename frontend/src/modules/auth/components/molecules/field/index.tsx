import ErrorMessage from "@/shared/components/ui/error"

import type { AuthFieldProps } from "@/modules/auth/types"

export default function AuthField({
  label,
  input,
  register,
  errors
}: AuthFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="auth__label" htmlFor={label.htmlFor}>
        {label.title}
      </label>

      <input
        id={input.id}
        type={input.type}
        placeholder={input.placeholder}
        className="auth__input"
        {...register(input.value, {
          required: input.requiredText,
          ...(input.type === "email" && {
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email format"
            }
          })
        })}
      />

      {errors[input.value] && (
        <ErrorMessage message={errors[input.value]?.message as string} />
      )}
    </div>
  )
}

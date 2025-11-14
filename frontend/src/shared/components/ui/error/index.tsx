export default function ErrorMessage({ message }: { message?: string }) {
  return (
    <div className="mt-1 bg-[#f9e4e8] p-2">
      <span className="text-[12px] font-bold text-[#e04562]">{message}</span>
    </div>
  )
}

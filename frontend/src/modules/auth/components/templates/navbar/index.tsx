import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <nav className="custom-container flex items-center justify-between py-10">
      <Link
        className="text-[20px] text-[var(--color-mint)] uppercase md:text-[25px]"
        to="/">
        mvp todo
      </Link>
    </nav>
  )
}

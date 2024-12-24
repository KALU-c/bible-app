import ModeToggleQuick from "@/global/mode-toggle-two"
import ChangeFont from "./change-font"
import ParallelToggle from "./parallel-toggle"
import PlaySound from "./play-sound"
import { SelectBook } from "./select-book"
import { SelectVersion } from "./select-version"
import MoreButton from "./more-button"

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-2 border-b">
      <div className="flex gap-4">
        {/* select books */}
        <SelectBook />
        {/* select versions */}
        <SelectVersion />
      </div>
      {/* right sidebar tools */}
      <div className="flex gap-1 items-center">
        <ModeToggleQuick />
        <PlaySound />
        <ChangeFont />
        <ParallelToggle />
        <MoreButton />
      </div>
    </nav>
  )
}

export default Navbar

import ModeToggleQuick from "@/global/mode-toggle-two"
import ChangeFont from "./change-font"
import ParallelToggle from "./parallel-toggle"
import PlaySound from "./play-sound"
import { SelectBook } from "./select-book"
import MoreButton from "./more-button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { BibleVersionSelector } from "./select-language-and-version"
import { useBookSetting } from "@/providers/book-provider"

const Navbar = () => {
  const { isParallel } = useBookSetting();

  return (
    <nav className="flex justify-between items-center p-2 border-b">
      <SidebarTrigger />
      <div className="flex items-center gap-6">
        {isParallel === "double" && (
          <div className="flex gap-4 items-center">
            {/* select books */}
            <SelectBook />
            {/* select versions */}
            <BibleVersionSelector />
          </div>
        )}
        {/* right sidebar tools */}
        <div className="flex gap-1 items-center">
          <ModeToggleQuick />
          <PlaySound />
          <ChangeFont />
          <ParallelToggle />
          <MoreButton />
        </div>
      </div>
    </nav>
  )
}

export default Navbar

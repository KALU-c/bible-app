import ModeToggleQuick from "@/global/mode-toggle-two"
import ChangeFont from "./change-font"
import ParallelToggle from "./parallel-toggle"
// import PlaySound from "./play-sound"
import { SelectBook } from "./select-book"
import MoreButton from "./more-button"
import { SidebarTrigger } from "@/components/ui/sidebar"
// import { BibleVersionSelector } from "./select-language-and-version"
import { useBookSetting } from "@/providers/book-provider"
import ToggleNote from "./toggle-note"
import Settings from "@/pages/settings/settings"

const Navbar = () => {
  const { isParallel } = useBookSetting();

  return (
    <nav className="flex justify-between items-center px-2 py-1 border-b">
      <SidebarTrigger />
      <div className="flex items-center gap-6">
        {isParallel === "double" && (
          <div className="flex gap-4 items-center">
            {/* select versions */}
            {/* <BibleVersionSelector /> */}
            {/* select books */}
            <SelectBook />
          </div>
        )}
        {/* right sidebar tools */}
        <div className="flex gap-2 items-center">
          <ModeToggleQuick />
          {/* <PlaySound /> */}
          <ChangeFont />
          <ToggleNote />
          <ParallelToggle />
          <Settings />
          <MoreButton />
        </div>
      </div>
    </nav>
  )
}

export default Navbar

import { Button } from "@/components/ui/button"
import { useBookSetting } from "@/providers/book-provider"
import { NotebookPen } from "lucide-react"

const ToggleNote = () => {
  const { isNoteOpen, setNoteOpen } = useBookSetting()

  function handleNoteToggle() {
    if (isNoteOpen === "onCurrentWindow") {
      setNoteOpen("off")
    } else {
      setNoteOpen("onCurrentWindow")
    }
  }

  return (
    <Button
      className={`w-7 h-7 ${isNoteOpen === "onCurrentWindow" ? "bg-zinc-300 dark:bg-zinc-600 hover:bg-zinc-400" : ""}`}
      variant={isNoteOpen === "onCurrentWindow" ? "secondary" : "ghost"}
      onClick={handleNoteToggle}
    >
      <NotebookPen />
    </Button>
  )
}
export default ToggleNote
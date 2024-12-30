import { Button } from "@/components/ui/button"
import { NotebookPen } from "lucide-react"
import { useState } from "react"

const ToggleNote = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Button
      className={`w-8 h-8 ${open ? "bg-zinc-300 dark:bg-zinc-600 hover:bg-zinc-400" : ""}`}
      variant={open ? "secondary" : "ghost"}
      onClick={() => setOpen(!open)}
    >
      <NotebookPen />
    </Button>
  )
}
export default ToggleNote
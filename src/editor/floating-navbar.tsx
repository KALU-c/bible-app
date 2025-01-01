import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useCurrentEditor } from "@tiptap/react"
import { Bold, Highlighter } from "lucide-react"
import AddImage from "./add-image-button"

export const FloatingNavbar = ({
  className
}: {
  className?: string
}) => {
  const { editor } = useCurrentEditor()

  return (
    <div
      className={cn(
        "border-b bg-zinc-50 dark:bg-zinc-700 flex flex-row items-center gap-1 px-2 z-50",
        className
      )}>
      <Button
        variant={editor?.isActive("bold") ? "default" : "ghost"}
        className="w-7 h-7 rounded-none"
        onClick={() => editor?.chain().focus().toggleBold().run()}
      >
        <Bold />
      </Button>
      <Button
        variant={editor?.isActive("highlight") ? "default" : "ghost"}
        className="w-7 h-7 rounded-none"
        onClick={() => editor?.commands.toggleHighlight()}
      >
        <Highlighter />
      </Button>
      <AddImage editor={editor} className="w-[50px]" />
    </div>
  )
}
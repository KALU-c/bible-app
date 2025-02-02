import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useCurrentEditor } from "@tiptap/react"
import { Bold, Highlighter, Redo2, Undo2 } from "lucide-react"
import AddImage from "./add-image-button"
import { Separator } from "@/components/ui/separator"

import SaveToFile from "./save-to-file"

export const FloatingNavbar = ({
  className
}: {
  className?: string
}) => {
  const { editor } = useCurrentEditor()

  return (
    <div className="flex flex-row justify-between items-center dark:bg-black border-b z-10">
      <div
        className={cn(
          "flex flex-row items-center gap-0 px-2 py-1",
          className
        )}>
        <Button
          variant={"ghost"}
          className="w-7 h-7 rounded-none"
          disabled={!editor?.can().undo()}
          onClick={() => editor?.chain().focus().undo().run()}
        >
          <Undo2 />
        </Button>
        <Button
          variant={"ghost"}
          className="w-7 h-7 rounded-none"
          disabled={!editor?.can().redo()}
          onClick={() => editor?.chain().focus().redo().run()}
        >
          <Redo2 />
        </Button>
        <Separator orientation="vertical" className="mx-1 h-[25px]" />
        <Button
          variant={editor?.isActive("bold") ? "secondary" : "ghost"}
          className="w-7 h-7 rounded-none p-1"
          onClick={() => editor?.chain().focus().toggleBold().run()}
        >
          <Bold />
        </Button>
        <Button
          variant={editor?.isActive("highlight") ? "secondary" : "ghost"}
          className="w-7 h-7 rounded-none"
          onClick={() => editor?.commands.toggleHighlight()}
        >
          <Highlighter />
        </Button>
        <AddImage editor={editor} className="w-[50px]" />

      </div>
      <SaveToFile editor={editor} />
    </div>
  )
}
import { Button } from "@/components/ui/button"
import { useCurrentEditor } from "@tiptap/react"
import { Bold, Highlighter } from "lucide-react"

const BubbleMenuButtons = () => {
  const { editor } = useCurrentEditor()

  return (
    <div
      className="bg-zinc-50 dark:bg-zinc-800 rounded-md outline outline-zinc-100 dark:outline-zinc-700 flex flex-row"
    >
      <Button
        variant={editor?.isActive("bold") ? "default" : "ghost"}
        className="w-7 h-7"
        onClick={() => editor?.chain().focus().toggleBold().run()}
      >
        <Bold />
      </Button>
      <Button
        variant={editor?.isActive("highlight") ? "default" : "ghost"}
        className="w-7 h-7"
        onClick={() => editor?.commands.toggleHighlight()}
      >
        <Highlighter />
      </Button>
    </div>
  )
}

export default BubbleMenuButtons
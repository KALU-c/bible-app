import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { BadgeHelp, FilePenLine, Fullscreen, MoreVertical } from "lucide-react"
import { useState } from "react"
import { getCurrentWindow } from "@tauri-apps/api/window";
import { WebviewWindow } from "@tauri-apps/api/webviewWindow";

const MoreButton = () => {
  const [isFullscreen, setFullscreen] = useState<boolean>(false);

  const appWindow = getCurrentWindow();

  function newEditorWindow() {
    const editorWindow = new WebviewWindow('editor', {
      url: '/editor',
      width: 800,
      height: 600,
      resizable: true
    })

    editorWindow.once('tauri://window-created', () => {
      console.log("Editor window successfully created")
    })

    editorWindow.once('tauri://error', (e) => {
      console.log('Failed to create editor window', e)
    })
  }

  async function toggleFullscreen() {
    const isFullscreen = await appWindow.isFullscreen();
    setFullscreen(isFullscreen);
    if (isFullscreen) {
      await appWindow.setFullscreen(false);
    } else {
      await appWindow.setFullscreen(true);
    }
    setFullscreen(!isFullscreen);
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          className="h-7 w-7"
          variant="ghost"
        >
          <MoreVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          className="font-medium hover:cursor-pointer"
          onClick={toggleFullscreen}
        >
          <Fullscreen />
          {isFullscreen ? "Exit" : "Set"} full screen
        </DropdownMenuItem>
        <DropdownMenuItem
          className="font-medium hover:cursor-pointer"
          onClick={newEditorWindow}
        >
          <FilePenLine />
          New Separate Editor
        </DropdownMenuItem>
        <DropdownMenuItem
          className="font-medium hover:cursor-pointer"
        >
          <BadgeHelp />
          About
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default MoreButton

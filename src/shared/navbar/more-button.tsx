import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { BadgeHelp, Fullscreen, MoreVertical } from "lucide-react"
import { useState } from "react"
import { getCurrentWindow } from "@tauri-apps/api/window";

const MoreButton = () => {
  const [isFullscreen, setFullscreen] = useState<boolean>(false);

  const appWindow = getCurrentWindow();

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
          className="h-8 w-8"
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
        >
          <BadgeHelp />
          About
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default MoreButton

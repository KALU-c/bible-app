import { Button } from "@/components/ui/button"
import { useTheme } from "@/providers/theme-provider"
import { Window } from "@tauri-apps/api/window";
import { Moon, Sun } from "lucide-react";

const ModeToggleQuick = () => {
  const { theme, setTheme } = useTheme();
  const appWindow = new Window("main");

  async function changeTheme() {
    if (theme === "dark") {
      setTheme("light")
      await appWindow.setTheme("light");
    } else if (theme === "light") {
      setTheme("dark")
      await appWindow.setTheme("dark");
    }
  };

  return (
    <Button
      className="h-8 w-8"
      variant="ghost"
      onClick={changeTheme}
    >
      {theme === "dark"
        ? <Moon />
        : <Sun />
      }
    </Button>
  )
}

export default ModeToggleQuick

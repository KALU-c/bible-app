import { Button } from "@/components/ui/button"
import { useTheme } from "@/providers/theme-provider"
import { Moon, Sun } from "lucide-react";

const ModeToggleQuick = () => {
  const { theme, setTheme } = useTheme();

  function changeTheme() {
    if (theme === "dark") {
      setTheme("light")
    } else if (theme === "light") {
      setTheme("dark")
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

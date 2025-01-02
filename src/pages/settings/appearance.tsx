import { Switch } from "@/components/ui/switch"
import { Fullscreen } from "lucide-react"
import Theme from "./theme"
import { useBookSetting } from "@/providers/book-provider"
import { useTheme } from "@/providers/theme-provider"

const Appearance = () => {
  const { fontFamily } = useBookSetting()
  const { setTheme } = useTheme()

  return (
    <div className={`${fontFamily === "Source Serif Pro" ? "font-source-serif" : "font-inter"} flex flex-col space-y-4`}>
      <div className="flex items-center space-x-4 rounded-md border p-4">
        <Fullscreen size={20} />
        <div className="flex-1 space-y-1">
          <p className="text-sm font-semibold leading-none">Fullscreen Mode</p>
          <p className="text-xs text-muted-foreground">Switch to enable or disable fullscreen mode.</p>
        </div>
        <Switch />
      </div>
      <div className="flex items-center space-x-4 rounded-md border p-4">
        <Fullscreen size={20} />
        <div className="flex-1 space-y-1">
          <p className="text-sm font-semibold leading-none">
            Dark Mode
          </p>
          <p className="text-xs text-muted-foreground">Switch to enable or disable dark mode.</p>
        </div>
        <Switch
          onCheckedChange={(checked: boolean) => {
            setTheme(checked ? "dark" : "light")
          }}
        />
      </div>
      <Theme />
    </div>
  )
}
export default Appearance
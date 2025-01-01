import { Switch } from "@/components/ui/switch"
import { Fullscreen } from "lucide-react"

const Appearance = () => {
  return (
    <div>
      <div className="flex items-center space-x-4 rounded-md border p-4">
        <Fullscreen size={20} />
        <div className="flex-1 space-y-1">
          <p className="text-sm font-medium leading-none">Fullscreen Mode</p>
          <p className="text-xs text-muted-foreground">Switch to enable or disable fullscreen mode.</p>
        </div>
        <Switch />
      </div>
    </div>
  )
}
export default Appearance
import { useState } from "react";
import { CaseSensitive } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

type FontSizeType = "small" | "medium" | "large";
type FontFamilyType = "Inter" | "Source Serif Pro";

const ChangeFont = () => {
  const [fontSize, setFontSize] = useState<FontSizeType>("medium");
  const [fontFamily, setFontFamily] = useState<FontFamilyType>("Inter");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="w-7 h-7" variant="outline">
          <CaseSensitive />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0">
        <DropdownMenuLabel
          className="text-xs text-center border-b bg-zinc-100 dark:bg-zinc-800"
        >
          READER SETTING
        </DropdownMenuLabel>
        <div className="p-3 space-y-3">
          {/* change font size */}
          <div className="flex gap-0 border rounded-md">
            <Button
              className="rounded-r-none h-[50px] w-[70px]"
              variant={fontSize === "small" ? "default" : "ghost"}
              onClick={() => setFontSize("small")}
            >
              aA
            </Button>
            <Button
              className="rounded-none h-[50px] w-[70px] text-lg"
              variant={fontSize === "medium" ? "default" : "ghost"}
              onClick={() => setFontSize("medium")}
            >
              aA
            </Button>
            <Button
              className="rounded-l-none h-[50px] w-[70px] text-2xl"
              variant={fontSize === "large" ? "default" : "ghost"}
              onClick={() => setFontSize("large")}
            >
              aA
            </Button>
          </div>
          {/* change font family */}
          <div className="flex gap-0 border rounded-md">
            <Button
              className="rounded-r-none w-full p-5"
              variant={fontFamily === "Inter" ? "default" : "ghost"}
              onClick={() => setFontFamily("Inter")}
            >
              Inter
            </Button>
            <Button
              className="rounded-l-none p-5"
              variant={fontFamily === "Source Serif Pro" ? "default" : "ghost"}
              onClick={() => setFontFamily("Source Serif Pro")}
            >
              Source Serif Pro
            </Button>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ChangeFont

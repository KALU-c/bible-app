// import { useState } from "react";
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { useBookSetting } from "@/providers/book-provider";

export type FontSizeType = "small" | "medium" | "large";
export type FontFamilyType = "Inter" | "Source Serif Pro";

const ChangeFont = () => {
  const { fontSize, setFontSize, fontFamily, setFontFamily } = useBookSetting();
  // const [fontSizeLocal, setFontSizeLocal] = useState<FontSizeType>(fontSize);
  // const [fontFamily, setFontFamily] = useState<FontFamilyType>("Inter");

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button className="w-8 h-8" variant="ghost">
          aA
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

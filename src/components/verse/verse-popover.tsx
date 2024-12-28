import { VerseFocusType, VerseHighlightColor, VerseType } from "@/types/verse-type"
import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from "../ui/popover"
import { CircleSlash2, Copy, Forward } from "lucide-react"
import { Label } from "../ui/label"
import { Separator } from "../ui/separator"
import { Button } from "../ui/button"

type VersePopoverType = {
  verse: VerseType,
  isVerseFocused: VerseFocusType[],
  setIsVerseFocused: React.Dispatch<React.SetStateAction<VerseFocusType[]>>
  highlightColor: VerseHighlightColor[]
  setHighlightColor: (highlightColor: VerseHighlightColor[]) => void
  children: React.ReactNode
}

const VersePopover = ({
  verse,
  highlightColor,
  isVerseFocused,
  setHighlightColor,
  setIsVerseFocused,
  children
}: VersePopoverType) => {

  function handleHighlightVerse(highlightBackgroundColor: string) {
    const newHighlights: VerseHighlightColor[] = isVerseFocused.map(verse => ({
      verse: verse.verse,
      backgroundColor: highlightBackgroundColor
    }));

    // Highlight all selected verse 
    setHighlightColor([
      ...highlightColor,
      ...newHighlights
    ]);

    // cleans all selected verses after highlighting
    setIsVerseFocused([])
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent className="w-52 p-2 flex flex-col gap-1">
        <div className="flex flex-col gap-2">
          <Label className="text-muted-foreground text-xs text-center">Highlight</Label>
          <div className="flex flex-row justify-between">
            <span
              className="w-[30px] h-[30px] rounded-full cursor-pointer flex items-center justify-center"
            // onClick={() => handleHighlightVerse("")}
            >
              <CircleSlash2 />
            </span>
            <span
              className="w-[30px] h-[30px] bg-green-300 rounded-full cursor-pointer"
              onClick={() => handleHighlightVerse("green-300")}
            ></span>
            <span
              className="w-[30px] h-[30px] bg-blue-300 rounded-full cursor-pointer"
              onClick={() => handleHighlightVerse("blue-300")}
            ></span>
            <span
              className="w-[30px] h-[30px] bg-red-300 rounded-full cursor-pointer"
              onClick={() => handleHighlightVerse("red-300")}
            ></span>
            <span
              className="w-[30px] h-[30px] bg-yellow-300 rounded-full cursor-pointer"
              onClick={() => handleHighlightVerse("yellow-300")}
            ></span>
          </div>
        </div>
        <Separator />
        <div className="flex flex-row justify-between gap-2">
          <Button variant="secondary" className="text-xs">
            <Forward />
            Share
          </Button>
          <Button
            variant="secondary"
            className="text-xs w-full"
            onClick={() => navigator.clipboard.writeText(`${verse.verseNumber} - ${verse.value}`)}
          >
            <Copy />
            Copy
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default VersePopover

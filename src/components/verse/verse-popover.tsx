import { VerseHighlightColor, VerseType } from "@/types/verse-type"
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
  // isVerseFocused: VerseFocusType[]
  highlightColor: VerseHighlightColor[]
  setHighlightColor: (highlightColor: VerseHighlightColor[]) => void
  children: React.ReactNode
}

const VersePopover = ({
  verse,
  highlightColor,
  setHighlightColor,
  children
}: VersePopoverType) => {

  // function handleHighlight(bgColor: string) {
  // todo - make it to highlight all the selected verses
  // const highlightAllSelectedVerses = highlightColor.ma
  // }

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
              onClick={() => setHighlightColor([...highlightColor, { verse: verse.verseNumber, backgroundColor: "green-300" }])}
            >
              <CircleSlash2 />
            </span>
            <span
              className="w-[30px] h-[30px] bg-green-300 rounded-full cursor-pointer"
              onClick={() => setHighlightColor([...highlightColor, { verse: verse.verseNumber, backgroundColor: "green-300" }])}
            ></span>
            <span
              className="w-[30px] h-[30px] bg-blue-300 rounded-full cursor-pointer"
              onClick={() => setHighlightColor([...highlightColor, { verse: verse.verseNumber, backgroundColor: "blue-300" }])}
            ></span>
            <span
              className="w-[30px] h-[30px] bg-red-300 rounded-full cursor-pointer"
              onClick={() => setHighlightColor([...highlightColor, { verse: verse.verseNumber, backgroundColor: "red-300" }])}
            ></span>
            <span
              className="w-[30px] h-[30px] bg-yellow-300 rounded-full cursor-pointer"
              onClick={() => setHighlightColor([...highlightColor, { verse: verse.verseNumber, backgroundColor: "yellow-300" }])}
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

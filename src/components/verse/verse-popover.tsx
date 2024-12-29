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
import { LocalStorageBookObject } from "@/types/book-type"

type VersePopoverType = {
  book: LocalStorageBookObject
  setBook: (book: LocalStorageBookObject) => void
  verse: VerseType,
  isVerseFocused: VerseFocusType[],
  setIsVerseFocused: React.Dispatch<React.SetStateAction<VerseFocusType[]>>
  highlightColor: VerseHighlightColor[]
  children: React.ReactNode
}

const VersePopover = ({
  book,
  setBook,
  verse,
  highlightColor,
  isVerseFocused,
  setIsVerseFocused,
  children
}: VersePopoverType) => {

  function handleHighlightVerse(highlightBackgroundColor: string) {
    // TODO - overwrite the backgroundColor is the verse already exist
    const newHighlights: VerseHighlightColor[] = isVerseFocused.map(verse => ({
      book: book.book1.name,
      chapter: book.book1.chapter,
      verse: verse.verse,
      backgroundColor: highlightBackgroundColor
    }));

    // TODO - saves the last highlighted verse not the present
    // TODO - can't change already highlighted color
    setBook({
      ...book,
      book1: {
        ...book.book1,
        highlightedVerses: [
          ...highlightColor,
          ...newHighlights
        ]
      }
    });

    console.log(highlightColor);

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
              onClick={() => handleHighlightVerse("none")}
            >
              <CircleSlash2 />
            </span>
            <span
              className="w-[30px] h-[30px] bg-green-300 rounded-full cursor-pointer"
              onClick={() => handleHighlightVerse("#86efac")}
            ></span>
            <span
              className="w-[30px] h-[30px] bg-blue-300 rounded-full cursor-pointer"
              onClick={() => handleHighlightVerse("#93c5fd")}
            ></span>
            <span
              className="w-[30px] h-[30px] bg-red-300 rounded-full cursor-pointer"
              onClick={() => handleHighlightVerse("#fca5a5")}
            ></span>
            <span
              className="w-[30px] h-[30px] bg-yellow-300 rounded-full cursor-pointer"
              onClick={() => handleHighlightVerse("#fde047")}
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

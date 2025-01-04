import { VerseFocusType, VerseType } from "@/types/verse-type"
import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from "../ui/popover"
import { Bold, Bookmark, ChevronDown, Highlighter, Italic, X } from "lucide-react"
import { Separator } from "../ui/separator"
import { HighlightedVersesType, LocalStorageBookObject } from "@/types/book-type"
import { BookItemType } from "@/assets/book/formatted-json"
import { CopyToClipBoardButton } from "@/global/copy-to-clipbord-button"
import { Button } from "../ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { useState } from "react"

type VersePopoverType = {
  book: LocalStorageBookObject
  setBook: (book: LocalStorageBookObject) => void
  verse: VerseType,
  isVerseFocused: VerseFocusType[],
  setIsVerseFocused: React.Dispatch<React.SetStateAction<VerseFocusType[]>>
  highlightColor: HighlightedVersesType[]
  children: React.ReactNode
  book1?: BookItemType[]
  book2?: BookItemType[]
}

const VersePopover = ({
  book,
  book2,
  setBook,
  verse,
  isVerseFocused,
  setIsVerseFocused,
  children
}: VersePopoverType) => {

  const [currentHighlightColor, setHighlightColor] = useState("#fde047")

  function handleHighlightVerse(highlightBackgroundColor: string) {
    setHighlightColor(highlightBackgroundColor)
    if (isVerseFocused.length > 0) {
      if (book2) {
        const verseAlreadyHighlighted = book.book2.highlightedVerses.find(item => item.reference.verse === verse.verseNumber);

        if (verseAlreadyHighlighted) {
          verseAlreadyHighlighted.background_color = highlightBackgroundColor;
        } else {
          const newHighlights: HighlightedVersesType[] = isVerseFocused.map(verse => ({
            reference: { book: book.book2.name, chapter: book.book2.chapter, verse: verse.verse! },
            background_color: highlightBackgroundColor
          }));

          // TODO - saves the last highlighted verse not the present
          // TODO - can't change already highlighted color
          setBook({
            ...book,
            book2: {
              ...book.book2,
              highlightedVerses: [
                ...book.book2.highlightedVerses,
                ...newHighlights
              ]
            }
          });
        }

        setIsVerseFocused([])
      } else {
        const verseAlreadyHighlighted = book.book1.highlightedVerses.find(item => (item.reference.verse === verse.verseNumber && item.reference.chapter === verse.chapterNumber));

        if (verseAlreadyHighlighted) {
          verseAlreadyHighlighted.background_color = highlightBackgroundColor;
        } else {
          // TODO - overwrite the backgroundColor is the verse already exist
          const newHighlights: HighlightedVersesType[] = isVerseFocused.map(verse => ({
            reference: { book: book.book1.name, chapter: book.book1.chapter, verse: verse.verse! },
            background_color: highlightBackgroundColor
          }));

          // TODO - saves the last highlighted verse not the present
          // TODO - can't change already highlighted color
          setBook({
            ...book,
            book1: {
              ...book.book1,
              highlightedVerses: [
                ...book.book1.highlightedVerses,
                ...newHighlights
              ]
            }
          });
        }

        setIsVerseFocused([])
      }
    }
  };

  // TODO - finish this function
  // function removeHighlight() { }

  return (
    <Popover>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent className="w-52 p-1 flex gap-3 items-center shadow-md shadow-zinc-300 dark:shadow-zinc-800">
        <div className="flex items-center">
          <Button
            variant="ghost"
            className="h-8 w-8 p-0 rounded-sm"
          >
            <Bold />
          </Button>
          <Button
            variant="ghost"
            className="h-8 w-8 p-0 rounded-sm"
          >
            <Italic />
          </Button>
          <Button
            variant="ghost"
            className="h-8 w-8 p-0 rounded-sm"
          >
            <Bookmark />
          </Button>
          <div className="flex">
            <Button
              variant="ghost"
              className="h-8 w-8 p-0 rounded-sm"
              onClick={() => handleHighlightVerse(currentHighlightColor)}
            >
              <Highlighter />
            </Button>
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-8 w-4 p-0 rounded-sm"
                >
                  <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[45px] min-w-0 flex flex-col gap-1">
                <DropdownMenuItem
                  className="p-0 border h-[30px] cursor-pointer focus:bg-zinc-200 dark:focus:bg-zinc-800 flex items-center justify-center"
                  onClick={() => handleHighlightVerse("")}
                >
                  <X />
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="p-0 bg-green-300 h-[30px] cursor-pointer focus:bg-green-400"
                  onClick={() => handleHighlightVerse("#86efac")}
                >
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="h-[30px] bg-blue-300 cursor-pointer focus:bg-blue-400"
                  onClick={() => handleHighlightVerse("#93c5fd")}
                >
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="h-[30px] bg-red-300 cursor-pointer focus:bg-red-400"
                  onClick={() => handleHighlightVerse("#fca5a5")}
                >
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="h-[30px] bg-yellow-300 cursor-pointer focus:bg-yellow-400"
                  onClick={() => handleHighlightVerse("#fde047")}
                >
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <Separator orientation="vertical" className="h-8 w-[1.5px]" />
        <div className="flex flex-row justify-between gap-2">
          <CopyToClipBoardButton verse={verse} book={book} book2={book2} />
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default VersePopover

import { VerseFocusType, VerseType } from "@/types/verse-type"
import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from "../ui/popover"
import { X } from "lucide-react"
import { Label } from "../ui/label"
import { Separator } from "../ui/separator"
import { HighlightedVersesType, LocalStorageBookObject } from "@/types/book-type"
import { BookItemType } from "@/assets/book/formatted-json"
import { CopyToClipBoardButton } from "@/global/copy-to-clipbord-button"

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

  function handleHighlightVerse(highlightBackgroundColor: string) {
    if (isVerseFocused) {
      if (book2) {
        // TODO - overwrite the backgroundColor is the verse already exist
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

        console.log(book.book1.highlightedVerses)

        setIsVerseFocused([])
      }
    }
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
              className="w-[30px] h-[30px] rounded-full cursor-pointer flex items-center justify-center border"
              onClick={() => handleHighlightVerse("")}
            >
              <X />
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
          <CopyToClipBoardButton verse={verse} book={book} book2={book2} />
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default VersePopover

import { BookItemType, getBookByChapter } from "@/assets/book/formatted-json"
import { useSidebar } from "@/components/ui/sidebar"
import VersePopover from "@/components/verse/verse-popover"
import { useBookSetting } from "@/providers/book-provider"
import { VerseFocusType, VerseType } from "@/types/verse-type"
import { useEffect, useState } from "react"
import LongText from "./LongText"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"


const Reader = () => {
  const { isParallel, book, setBook, fontSize } = useBookSetting();
  const { isMobile, open } = useSidebar();

  const { name: bookName, chapter: book1Chapter, highlightedVerses: highlightColor } = book.book1;

  const [isVerseFocused, setIsVerseFocused] = useState<VerseFocusType[]>([]);
  const [book1, setBook1] = useState<BookItemType[]>([]);

  useEffect(() => {
    if (!bookName || !book1Chapter) {
      getBookByChapter("genesis", 1).then(res => setBook1(res));
    } else {
      getBookByChapter(bookName, book1Chapter).then(res => setBook1(res));
    }
  }, [bookName, book1Chapter]);

  function setHighlightedVerse(verse: VerseType) {
    setBook({
      ...book,
      book1: {
        ...book.book1,
        highlightedVerses: [
          ...highlightColor,
          { book: bookName, chapter: book1Chapter, verse: verse.verseNumber }
        ]
      }
    })
  }

  // TODO - make it work
  function handleClick(verse: VerseType) {
    const isVerseFocusedRn = isVerseFocused.find(item => item.verse === verse.verseNumber);
    const isVerseHighlighted = highlightColor.find(item => item.verse === verse.verseNumber);

    if (isVerseFocusedRn) {
      setIsVerseFocused(isVerseFocused.filter(item => item.verse !== verse.verseNumber))
    } else {
      setIsVerseFocused([...isVerseFocused, { verse: verse.verseNumber, isFocused: true }])
    }

    if (isVerseFocusedRn && !isVerseHighlighted) {
      setHighlightedVerse(verse);
    }
  }

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className={(isParallel === "single") ? (open ? "px-64 py-4" : "py-4 xl:px-80 lg:px-52 md:px-16 sm:px-4") : "w-full"}
    >
      <ResizablePanel>
        <div className={isParallel === "double" ? `overflow-auto max-h-[94vh] scrollbar dark:scrollbar-dark py-4 ${(isMobile ? "px-6" : "px-24")}` : "py-4"}>
          <h1 className="text-center text-lg mb-6 font-semibold text-muted-foreground">{bookName.toUpperCase()} {book1Chapter}</h1>
          {book1.map((verse, index) => (
            <>
              {(verse.type === "paragraph text" || verse.type === "line text") && (
                <VersePopover
                  key={verse.chapterNumber + verse.verseNumber + index}
                  book={book}
                  setBook={setBook}
                  verse={verse}
                  highlightColor={highlightColor}
                  isVerseFocused={isVerseFocused}
                  setIsVerseFocused={setIsVerseFocused}
                >
                  <span
                    style={highlightColor.find(item => item.verse === verse.verseNumber) && {
                      color: highlightColor.find(item => item.verse === verse.verseNumber)?.textColor,
                      backgroundColor: highlightColor?.find(item => (item.verse === verse.verseNumber && item.book === bookName && item.chapter === verse.chapterNumber))?.backgroundColor
                    }}
                    className={`
                    mb-1 cursor-pointer p-1 
                    ${fontSize === "small" ? "text-[16px]" : ""}
                    ${fontSize === "medium" ? "text-[18px]" : ""}
                    ${fontSize === "large" ? "text-[20px]" : ""}
                    ${highlightColor?.find(item => (item.verse === verse.verseNumber && item.book === bookName && item.chapter === verse.chapterNumber)) ? "dark:text-black" : ""}
                    ${isVerseFocused.find(item => item.verse === verse.verseNumber)
                        ? `border-b border-dotted border-b-black dark:border-b-white rounded-sm`
                        : "border-none"}
                  `}
                    onClick={() => handleClick(verse)}
                  >
                    <sup
                      className={`
                  text-xs text-blue-500 mr-1 
                  ${(verse.type === "line text" && verse.value === " ") && "hidden"}
                  ${(verse.sectionNumber !== 1 && "hidden")}
                `}
                    >
                      {verse.verseNumber}
                    </sup>
                    {verse.value}
                  </span>
                </VersePopover>
              )}

              {verse.type === "paragraph end" && (
                <>
                  <br />
                  <br />
                </>
              )}

              {verse.type === "stanza end" && (
                <>
                  <br />
                  <br />
                </>
              )}
            </>
          ))}
        </div>
      </ResizablePanel>
      {isParallel === "double" && <ResizableHandle withHandle />}
      <ResizablePanel
        minSize={isParallel === "double" ? 30 : 0}
        maxSize={isParallel === "double" ? 60 : 0}
        className={`h-full w-full ${isParallel === "single" ? "hidden" : "block px-1"}`}
      >
        <div className="overflow-auto max-h-[93vh] scrollbar dark:scrollbar-dark px-2">
          <LongText />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

export default Reader

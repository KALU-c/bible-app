import { BookItemType, getBookByChapter } from "@/assets/book/formatted-json"
import { useSidebar } from "@/components/ui/sidebar"
import VersePopover from "@/components/verse/verse-popover"
import { IsNoteOpenType, IsParallelType, useBookSetting } from "@/providers/book-provider"
import { VerseFocusType, VerseType } from "@/types/verse-type"
import { useEffect, useState } from "react"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { LocalStorageBookObject } from "@/types/book-type"
import { FontSizeType } from "@/shared/navbar/change-font"
import Tiptap from "@/editor/Tiptap"


const Reader = () => {
  const { isParallel, isNoteOpen, book, setBook, fontSize } = useBookSetting();
  const { isMobile, open } = useSidebar();

  useEffect(() => {
    if (isNoteOpen === "onCurrentWindow" || isParallel === "double") {
      document.body.classList.remove('body-show-overflow')
      document.body.classList.add('body-hide-overflow')
    } else {
      document.body.classList.remove("body-hide-overflow")
      document.body.classList.add('body-show-overflow')
    }
  }, [isParallel, isNoteOpen])

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className={
        (isParallel === "single" && isNoteOpen !== "onCurrentWindow")
          ? (open ? "px-64 py-4" : "xl:px-80 lg:px-52 md:px-16 sm:px-4")
          : (open ? "px-64 py-4" : "")
      }
    >
      <ResizablePanel
        minSize={30}
        maxSize={(isNoteOpen === "onCurrentWindow" || isParallel === "double") ? 70 : 100}
      >
        <FirstBook
          book={book}
          setBook={setBook}
          fontSize={fontSize}
          isMobile={isMobile}
          isParallel={isParallel}
          isNoteOpen={isNoteOpen}
        />
      </ResizablePanel>
      {isParallel === "double" && <ResizableHandle withHandle />}
      <ResizablePanel
        minSize={isParallel === "double" ? 30 : 0}
        maxSize={isParallel === "double" ? 70 : 0}
        className={`h-full w-full ${isParallel === "single" ? "hidden" : "block"}`}
      >
        <SecondBook
          book={book}
          setBook={setBook}
          fontSize={fontSize}
          isMobile={isMobile}
          isNoteOpen={isNoteOpen}
          isParallel={isParallel}
        />
      </ResizablePanel>
      {isNoteOpen === "onCurrentWindow" && <ResizableHandle withHandle />}
      <ResizablePanel
        minSize={isNoteOpen === "onCurrentWindow" ? 20 : 0}
        maxSize={isNoteOpen === "onCurrentWindow" ? 70 : 0}
        className={`h-full w-full ${isNoteOpen === "onCurrentWindow" ? "block" : "hidden"}`}
      >
        <div className="overflow-auto max-h-[93vh] scrollbar dark:scrollbar-dark w-full">
          <Tiptap />
        </div>
      </ResizablePanel>

    </ResizablePanelGroup>
  )
}

type FirstBookProps = {
  book: LocalStorageBookObject
  setBook: (book: LocalStorageBookObject) => void
  fontSize: FontSizeType
  isParallel: IsParallelType
  isMobile: boolean
  isNoteOpen: IsNoteOpenType
}

const FirstBook = ({
  book,
  setBook,
  fontSize,
  isParallel,
  isMobile,
  isNoteOpen
}: FirstBookProps) => {
  const { name: bookName, chapter: book1Chapter, highlightedVerses: highlightColor } = book.book1;

  const [book1, setBook1] = useState<BookItemType[]>([]);
  const [isVerseFocused, setIsVerseFocused] = useState<VerseFocusType[]>([]);


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
    <div className={(isParallel === "double" || isNoteOpen === "onCurrentWindow") ? `overflow-auto max-h-[94vh] scrollbar dark:scrollbar-dark py-4 ${(isMobile ? "px-6" : (isNoteOpen === "onCurrentWindow" ? "px-8" : "px-16"))}` : "py-4"}>
      <div className="mb-8 flex flex-col text-center">
        <h1 className="text-center text-xl font-semibold text-muted-foreground">{bookName.toUpperCase()}</h1>
        <span className="text-5xl">{book1Chapter}</span>
      </div>
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
                    ${fontSize === "small" ? "text-[18px]" : ""}
                    ${fontSize === "medium" ? "text-[23px]" : ""}
                    ${fontSize === "large" ? "text-[28px]" : ""}
                    ${highlightColor?.find(item => (item.verse === verse.verseNumber && item.book === bookName && item.chapter === verse.chapterNumber)) ? "dark:text-black rounded-md" : ""}
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
  )
}

type SecondBookProps = {
  book: LocalStorageBookObject
  setBook: (book: LocalStorageBookObject) => void
  fontSize: FontSizeType
  isParallel: IsParallelType
  isMobile: boolean
  isNoteOpen: IsNoteOpenType
}

const SecondBook = ({
  book,
  setBook,
  fontSize,
  isMobile,
  isParallel,
  isNoteOpen
}: SecondBookProps) => {

  const { name: bookName, chapter: book2Chapter, highlightedVerses: highlightColor } = book.book2;

  const [book2, setBook2] = useState<BookItemType[]>([]);
  const [isVerseFocused2, setIsVerseFocused2] = useState<VerseFocusType[]>([]);

  useEffect(() => {
    if (!bookName || !book2Chapter) {
      getBookByChapter("genesis", 1).then(res => setBook2(res));
    } else {
      getBookByChapter(bookName, book2Chapter).then(res => setBook2(res));
    }
  }, [bookName, book2Chapter]);

  function setHighlightedVerse(verse: VerseType) {
    setBook({
      ...book,
      book1: {
        ...book.book1,
        highlightedVerses: [
          ...highlightColor,
          { book: bookName, chapter: book2Chapter, verse: verse.verseNumber }
        ]
      }
    })
  }

  // TODO - make it work
  function handleClick(verse: VerseType) {
    const isVerseFocusedRn = isVerseFocused2.find(item => item.verse === verse.verseNumber);
    const isVerseHighlighted = highlightColor.find(item => item.verse === verse.verseNumber);

    if (isVerseFocusedRn) {
      setIsVerseFocused2(isVerseFocused2.filter(item => item.verse !== verse.verseNumber))
    } else {
      setIsVerseFocused2([...isVerseFocused2, { verse: verse.verseNumber, isFocused: true }])
    }

    if (isVerseFocusedRn && !isVerseHighlighted) {
      setHighlightedVerse(verse);
    }
  }

  return (
    <div className={isParallel === "double" ? `overflow-auto max-h-[94vh] scrollbar dark:scrollbar-dark py-4 ${(isMobile ? "px-6" : (isNoteOpen === "onCurrentWindow" ? "px-8" : "px-16"))}` : "py-4"}>
      <div className="mb-8 flex flex-col text-center">
        <h1 className="text-center text-xl font-semibold text-muted-foreground">{bookName.toUpperCase()}</h1>
        <span className="text-5xl">{book2Chapter}</span>
      </div>
      {book2.map((verse, index) => (
        <>
          {(verse.type === "paragraph text" || verse.type === "line text") && (
            <VersePopover
              key={verse.chapterNumber + verse.verseNumber + index}
              book={book}
              book2={book2}
              setBook={setBook}
              verse={verse}
              highlightColor={highlightColor}
              isVerseFocused={isVerseFocused2}
              setIsVerseFocused={setIsVerseFocused2}
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
                    ${isVerseFocused2.find(item => item.verse === verse.verseNumber)
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
  )
}

export default Reader

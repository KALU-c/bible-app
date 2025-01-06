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
import FloatingNoteInput from "@/components/verse/floating-note"
// import Amharic from "./amharic"


const Reader = () => {
  const { isParallel, isNoteOpen, books, setBook, fontSize } = useBookSetting();
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
          : (open ? "py-4" : "")
      }
    >
      <ResizablePanel
        minSize={30}
        maxSize={(isNoteOpen === "onCurrentWindow" || isParallel === "double") ? 70 : 100}
      >
        {/* <Amharic /> */}
        <FirstBook
          books={books}
          setBook={setBook}
          fontSize={fontSize}
          isMobile={isMobile}
          isParallel={isParallel}
          isNoteOpen={isNoteOpen}
        />
      </ResizablePanel>
      {isParallel === "double" && <ResizableHandle withHandle />}
      <ResizablePanel
        defaultSize={isParallel === "double" ? 50 : 0}
        minSize={isParallel === "double" ? 30 : 0}
        maxSize={isParallel === "double" ? 70 : 0}
        className={`h-full w-full ${isParallel === "single" ? "hidden" : "block px-[2px]"}`}
      >
        <SecondBook
          books={books}
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
  books: LocalStorageBookObject
  setBook: (books: LocalStorageBookObject) => void
  fontSize: FontSizeType
  isParallel: IsParallelType
  isMobile: boolean
  isNoteOpen: IsNoteOpenType
}

const FirstBook = ({
  books,
  setBook,
  fontSize,
  isParallel,
  isMobile,
  isNoteOpen
}: FirstBookProps) => {
  const { name: bookName, chapter: book1Chapter, highlightedVerses: highlightColor } = books.book1;

  const [book1, setBook1] = useState<BookItemType[]>([]);
  const [isVerseFocused, setIsVerseFocused] = useState<VerseFocusType[]>([]);


  useEffect(() => {
    if (!bookName || !book1Chapter) {
      getBookByChapter("genesis", 1).then(res => setBook1(res));
    } else {
      getBookByChapter(bookName, book1Chapter).then(res => setBook1(res));
    }
  }, [bookName, book1Chapter]);

  // TODO - make it work
  function handleClick(verse: VerseType) {
    const isVerseFocusedRn = isVerseFocused.find(item => item.verse === verse.verseNumber);

    if (isVerseFocusedRn) {
      setIsVerseFocused(isVerseFocused.filter(item => item.verse !== verse.verseNumber))
    } else {
      setIsVerseFocused([...isVerseFocused, { verse: verse.verseNumber, isFocused: true }])
    }
  }

  return (
    <div className={(isParallel === "double" || isNoteOpen === "onCurrentWindow") ? `overflow-auto max-h-[94vh] scrollbar dark:scrollbar-dark py-4 ${(isMobile ? "px-6" : (isNoteOpen === "onCurrentWindow" ? "px-8" : "px-16"))}` : "py-4"}>
      <div className="mb-8 flex flex-col text-center">
        <h1 className="text-center text-xl font-semibold text-muted-foreground">{bookName.toUpperCase()}</h1>
        <span className="text-5xl">{book1Chapter}</span>
        <FloatingNoteInput />
      </div>
      {book1.map((verse, index) => (
        <>
          {(verse.type === "paragraph text" || verse.type === "line text") && (
            <VersePopover
              key={verse.chapterNumber + verse.verseNumber + index}
              book={books}
              setBook={setBook}
              verse={verse}
              highlightColor={highlightColor}
              isVerseFocused={isVerseFocused}
              setIsVerseFocused={setIsVerseFocused}
            >
              <span
                style={highlightColor.find(item => item.reference.verse === verse.verseNumber) && {
                  backgroundColor: highlightColor?.find(item => (item.reference.verse === verse.verseNumber && item.reference.book === bookName && item.reference.chapter === verse.chapterNumber))?.background_color
                }}
                className={`
                    mb-1 cursor-pointer p-1 
                    ${fontSize === "small" ? "text-[16px]" : ""}
                    ${fontSize === "medium" ? "text-[18px]" : ""}
                    ${fontSize === "large" ? "text-[20px]" : ""}
                    ${highlightColor?.find(item => (item.reference.verse === verse.verseNumber && item.reference.book === bookName && item.reference.chapter === verse.chapterNumber)) ? "dark:text-black rounded-md" : ""}
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
  books: LocalStorageBookObject
  setBook: (books: LocalStorageBookObject) => void
  fontSize: FontSizeType
  isParallel: IsParallelType
  isMobile: boolean
  isNoteOpen: IsNoteOpenType
}

const SecondBook = ({
  books,
  setBook,
  fontSize,
  isMobile,
  isParallel,
  isNoteOpen
}: SecondBookProps) => {

  const { name: bookName, chapter: book2Chapter, highlightedVerses: highlightColor } = books.book2;

  const [book2, setBook2] = useState<BookItemType[]>([]);
  const [isVerseFocused2, setIsVerseFocused2] = useState<VerseFocusType[]>([]);

  useEffect(() => {
    if (!bookName || !book2Chapter) {
      getBookByChapter("genesis", 1).then(res => setBook2(res));
    } else {
      getBookByChapter(bookName, book2Chapter).then(res => setBook2(res));
    }
  }, [bookName, book2Chapter]);


  // TODO - make it work
  function handleClick(verse: VerseType) {
    const isVerseFocusedRn = isVerseFocused2.find(item => item.verse === verse.verseNumber);


    if (isVerseFocusedRn) {
      setIsVerseFocused2(isVerseFocused2.filter(item => item.verse !== verse.verseNumber))
    } else {
      setIsVerseFocused2([...isVerseFocused2, { verse: verse.verseNumber, isFocused: true }])
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
              book={books}
              book2={book2}
              setBook={setBook}
              verse={verse}
              highlightColor={highlightColor}
              isVerseFocused={isVerseFocused2}
              setIsVerseFocused={setIsVerseFocused2}
            >
              <span
                style={highlightColor.find(item => item.reference.verse === verse.verseNumber) && {
                  backgroundColor: highlightColor?.find(item => (item.reference.verse === verse.verseNumber && item.reference.book === bookName && item.reference.chapter === verse.chapterNumber))?.background_color
                }}
                className={`
                    mb-1 cursor-pointer p-1 
                    ${fontSize === "small" ? "text-[16px]" : ""}
                    ${fontSize === "medium" ? "text-[18px]" : ""}
                    ${fontSize === "large" ? "text-[20px]" : ""}
                    ${highlightColor?.find(item => (item.reference.verse === verse.verseNumber && item.reference.book === bookName && item.reference.chapter === verse.chapterNumber)) ? "dark:text-black" : ""}
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

import { FontFamilyType, FontSizeType } from "@/shared/navbar/change-font";
import { LocalStorageBookObject } from "@/types/book-type"
import { createContext, useContext, useState } from "react";

const BOOK_STORAGE_KEY = "current-book"
const FONT_SIZE_STORAGE_KEY = "current-font-size"
const FONT_FAMILY_STORAGE_KEY = "current-font-family"
const IS_PARALLEL_STORAGE_KEY = "is-parallel"
const IS_NOTE_OPEN_STORAGE_KEY = "is-note"

type BookProviderProps = {
  children: React.ReactNode
}

export type IsParallelType = "single" | "double"
export type IsNoteOpenType = "onCurrentWindow" | "onNewWindow" | "off"

type BookProviderState = {
  book: LocalStorageBookObject
  setBook: (book: LocalStorageBookObject) => void
  isParallel: IsParallelType
  toggleParallel: (isParallel: IsParallelType) => void
  isNoteOpen: IsNoteOpenType
  setNoteOpen: (isNoteOpen: IsNoteOpenType) => void
  fontSize: FontSizeType
  setFontSize: (fontSize: FontSizeType) => void
  fontFamily: FontFamilyType
  setFontFamily: (fontFamily: FontFamilyType) => void
}

const initialState: BookProviderState = {
  book: {
    book1: {
      name: "genesis",
      chapter: 1,
      version: "ASV", // TODO - change this to correct version
      highlightedVerses: [],
    },
    book2: {
      name: "genesis",
      chapter: 1,
      version: "KJV", // TODO - change this to correct version
      highlightedVerses: []
    }
  },
  setBook: () => null,
  isParallel: "single",
  isNoteOpen: "onCurrentWindow",
  setNoteOpen: () => null,
  toggleParallel: () => null,
  fontSize: "medium",
  setFontSize: () => null,
  fontFamily: "Inter",
  setFontFamily: () => null
}

const BookProviderContext = createContext<BookProviderState>(initialState)

export const BookProvider = ({
  children,
  ...props
}: BookProviderProps) => {
  const localBook = localStorage.getItem(BOOK_STORAGE_KEY);
  if (localBook === undefined) {
    localStorage.setItem(BOOK_STORAGE_KEY, JSON.stringify(initialState));
  }
  const parsedBook = localBook ? JSON.parse(localBook) : initialState.book;
  const [book, setBook] = useState<LocalStorageBookObject>(
    () => (parsedBook as LocalStorageBookObject) || initialState.book
  )
  const [fontSize, setFontSize] = useState<FontSizeType>(
    () => (localStorage.getItem(FONT_SIZE_STORAGE_KEY) as FontSizeType) || "medium"
  )
  const [fontFamily, setFontFamily] = useState<FontFamilyType>(
    () => (localStorage.getItem(FONT_FAMILY_STORAGE_KEY) as FontFamilyType) || "Inter"
  )
  const [isParallel, toggleParallel] = useState<IsParallelType>(
    () => (localStorage.getItem(IS_PARALLEL_STORAGE_KEY) as IsParallelType) || "single"
  )
  const [isNoteOpen, setNoteOpen] = useState<IsNoteOpenType>(
    () => (localStorage.getItem(IS_NOTE_OPEN_STORAGE_KEY) as IsNoteOpenType) || "onCurrentWindow"
  )

  const value = {
    book,
    setBook: (book: LocalStorageBookObject) => {
      localStorage.setItem(BOOK_STORAGE_KEY, JSON.stringify(book))
      setBook(book)
    },
    fontSize,
    setFontSize: (fontSize: FontSizeType) => {
      localStorage.setItem(FONT_SIZE_STORAGE_KEY, fontSize)
      setFontSize(fontSize)
    },
    fontFamily,
    setFontFamily: (fontFamily: FontFamilyType) => {
      localStorage.setItem(FONT_FAMILY_STORAGE_KEY, fontFamily)
      setFontFamily(fontFamily)
    },
    isParallel,
    toggleParallel: (isParallel: IsParallelType) => {
      localStorage.setItem(IS_PARALLEL_STORAGE_KEY, isParallel)
      toggleParallel(isParallel)
    },
    isNoteOpen,
    setNoteOpen: (isNoteOpen: IsNoteOpenType) => {
      localStorage.setItem(IS_NOTE_OPEN_STORAGE_KEY, isNoteOpen)
      setNoteOpen(isNoteOpen)
    }
  }


  return (
    <BookProviderContext.Provider {...props} value={value}>
      {children}
    </BookProviderContext.Provider>
  )
}

export const useBookSetting = () => {
  const context = useContext(BookProviderContext);

  if (context === undefined)
    throw new Error("useBookSetting must be use withing a BookProvider")

  return context
}

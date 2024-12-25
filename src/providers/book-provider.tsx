import { FontFamilyType, FontSizeType } from "@/shared/navbar/change-font";
import { BookType } from "@/types/book-type"
import { createContext, useContext, useState } from "react";

const BOOK_STORAGE_KEY = "current-book"
const FONT_SIZE_STORAGE_KEY = "current-font-size"
const FONT_FAMILY_STORAGE_KEY = "current-font-family"
const IS_PARALLEL_STORAGE_KEY = "is-parallel"

type BookProviderProps = {
  children: React.ReactNode
}

export type IsParallelType = "single" | "double"

type BookProviderState = {
  book: BookType
  setBook: (book: BookType) => void
  isParallel: IsParallelType
  toggleParallel: (isParallel: IsParallelType) => void
  fontSize: FontSizeType
  setFontSize: (fontSize: FontSizeType) => void
  fontFamily: FontFamilyType
  setFontFamily: (fontFamily: FontFamilyType) => void
}

const initialState: BookProviderState = {
  book: "genesis",
  setBook: () => null,
  isParallel: "single",
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
  const [book, setBook] = useState<BookType>(
    () => (localStorage.getItem(BOOK_STORAGE_KEY) as BookType) || "genesis"
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

  const value = {
    book,
    setBook: (book: BookType) => {
      localStorage.setItem(BOOK_STORAGE_KEY, book)
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

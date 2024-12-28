import { BookName } from "./book-type";

export type VerseType = {
  type: string;
  chapterNumber?: number;
  verseNumber?: number;
  sectionNumber?: number;
  value?: string;
}

export type VerseFocusType = {
  verse: number | undefined,
  isFocused: boolean
}

export type VerseHighlightColor = {
  book: BookName
  chapter: number
  verse?: number
  backgroundColor?: string
  textColor?: string
}
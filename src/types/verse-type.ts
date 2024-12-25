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
  verse: number | undefined
  backgroundColor?: string
  textColor?: string
}
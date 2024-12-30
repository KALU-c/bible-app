import { VerseHighlightColor } from "./verse-type"

export type BookTestamentType = "newTestament" | "oldTestament"

export type LocalStorageBookObject = {
  book1: {
    name: BookName
    chapter: number
    version: string // TODO - create a type for version type
    highlightedVerses: VerseHighlightColor[]
  }
  book2: {
    name: BookName
    chapter: number
    version: string // TODO - create a type for version type
    highlightedVerses: VerseHighlightColor[]
  }
}

export type BookName = "genesis" | "exodus" | "leviticus" | "numbers" | "deuteronomy" | "joshua" | "judges" | "ruth" | "1samuel" | "2samuel" | "1kings" | "2kings" | "1chronicles" | "2chronicles" | "ezra" | "nehemiah" | "esther" | "job" | "psalms" | "proverbs" | "ecclesiastes" | "songofsolomon" | "isaiah" | "jeremiah" | "lamentations" | "ezekiel" | "daniel" | "hosea" | "joel" | "amos" | "obadiah" | "jonah" | "micah" | "nahum" | "habakkuk" | "zephaniah" | "haggai" | "zechariah" | "malachi" | "matthew" | "mark" | "luke" | "john" | "acts" | "romans" | "1corinthians" | "2corinthians" | "galatians" | "ephesians" | "philippians" | "colossians" | "1thessalonians" | "2thessalonians" | "1timothy" | "2timothy" | "titus" | "philemon" | "hebrews" | "james" | "1pete" | "2pete" | "1joh" | "2joh" | "3joh" | "jude" | "revelation";


export const AllBookType = [
  { name: "genesis", totalChapter: 50 },
  { name: "exodus", totalChapter: 40 },
  { name: "leviticus", totalChapter: 27 },
  { name: "numbers", totalChapter: 36 },
  { name: "deuteronomy", totalChapter: 34 },
  { name: "joshua", totalChapter: 24 },
  { name: "judges", totalChapter: 21 },
  { name: "ruth", totalChapter: 4 },
  { name: "1samuel", totalChapter: 31 },
  { name: "2samuel", totalChapter: 24 },
  { name: "1kings", totalChapter: 22 },
  { name: "2kings", totalChapter: 25 },
  { name: "1chronicles", totalChapter: 29 },
  { name: "2chronicles", totalChapter: 36 },
  { name: "ezra", totalChapter: 10 },
  { name: "nehemiah", totalChapter: 13 },
  { name: "esther", totalChapter: 10 },
  { name: "job", totalChapter: 42 },
  { name: "psalms", totalChapter: 150 },
  { name: "proverbs", totalChapter: 31 },
  { name: "ecclesiastes", totalChapter: 12 },
  { name: "songofsolomon", totalChapter: 8 },
  { name: "isaiah", totalChapter: 66 },
  { name: "jeremiah", totalChapter: 52 },
  { name: "lamentations", totalChapter: 5 },
  { name: "ezekiel", totalChapter: 48 },
  { name: "daniel", totalChapter: 12 },
  { name: "hosea", totalChapter: 14 },
  { name: "joel", totalChapter: 3 },
  { name: "amos", totalChapter: 9 },
  { name: "obadiah", totalChapter: 1 },
  { name: "jonah", totalChapter: 4 },
  { name: "micah", totalChapter: 7 },
  { name: "nahum", totalChapter: 3 },
  { name: "habakkuk", totalChapter: 3 },
  { name: "zephaniah", totalChapter: 3 },
  { name: "haggai", totalChapter: 2 },
  { name: "zechariah", totalChapter: 14 },
  { name: "malachi", totalChapter: 4 },
  { name: "matthew", totalChapter: 28 },
  { name: "mark", totalChapter: 16 },
  { name: "luke", totalChapter: 24 },
  { name: "john", totalChapter: 21 },
  { name: "acts", totalChapter: 28 },
  { name: "romans", totalChapter: 16 },
  { name: "1corinthians", totalChapter: 16 },
  { name: "2corinthians", totalChapter: 13 },
  { name: "galatians", totalChapter: 6 },
  { name: "ephesians", totalChapter: 6 },
  { name: "philippians", totalChapter: 4 },
  { name: "colossians", totalChapter: 4 },
  { name: "1thessalonians", totalChapter: 5 },
  { name: "2thessalonians", totalChapter: 3 },
  { name: "1timothy", totalChapter: 6 },
  { name: "2timothy", totalChapter: 4 },
  { name: "titus", totalChapter: 3 },
  { name: "philemon", totalChapter: 1 },
  { name: "hebrews", totalChapter: 13 },
  { name: "james", totalChapter: 5 },
  { name: "1pete", totalChapter: 5 },
  { name: "2pete", totalChapter: 3 },
  { name: "1joh", totalChapter: 5 },
  { name: "2joh", totalChapter: 1 },
  { name: "3joh", totalChapter: 1 },
  { name: "jude", totalChapter: 1 },
  { name: "revelation", totalChapter: 22 }
];

import { BookName } from "@/types/book-type";

export interface BibleBook {
  label: string;
  value: BookName;
  chapterNumber: number;
}

export const bibleBooks = {
  oldTestament: [
    { label: "Genesis", value: "genesis" as BookName, chapterNumber: 50 },
    { label: "Exodus", value: "exodus" as BookName, chapterNumber: 40 },
    { label: "Leviticus", value: "leviticus" as BookName, chapterNumber: 27 },
    { label: "Numbers", value: "numbers" as BookName, chapterNumber: 36 },
    { label: "Deuteronomy", value: "deuteronomy" as BookName, chapterNumber: 34 },
    { label: "Joshua", value: "joshua" as BookName, chapterNumber: 24 },
    { label: "Judges", value: "judges" as BookName, chapterNumber: 21 },
    { label: "Ruth", value: "ruth" as BookName, chapterNumber: 4 },
    { label: "1 Samuel", value: "1samuel" as BookName, chapterNumber: 31 },
    { label: "2 Samuel", value: "2samuel" as BookName, chapterNumber: 24 },
    { label: "1 Kings", value: "1kings" as BookName, chapterNumber: 22 },
    { label: "2 Kings", value: "2kings" as BookName, chapterNumber: 25 },
    { label: "1 Chronicles", value: "1chronicles" as BookName, chapterNumber: 29 },
    { label: "2 Chronicles", value: "2chronicles" as BookName, chapterNumber: 36 },
    { label: "Ezra", value: "ezra" as BookName, chapterNumber: 10 },
    { label: "Nehemiah", value: "nehemiah" as BookName, chapterNumber: 13 },
    { label: "Esther", value: "esther" as BookName, chapterNumber: 10 },
    { label: "Job", value: "job" as BookName, chapterNumber: 42 },
    { label: "Psalms", value: "psalms" as BookName, chapterNumber: 150 },
    { label: "Proverbs", value: "proverbs" as BookName, chapterNumber: 31 },
    { label: "Ecclesiastes", value: "ecclesiastes" as BookName, chapterNumber: 12 },
    { label: "Song of Solomon", value: "songofsolomon" as BookName, chapterNumber: 8 },
    { label: "Isaiah", value: "isaiah" as BookName, chapterNumber: 66 },
    { label: "Jeremiah", value: "jeremiah" as BookName, chapterNumber: 52 },
    { label: "Lamentations", value: "lamentations" as BookName, chapterNumber: 5 },
    { label: "Ezekiel", value: "ezekiel" as BookName, chapterNumber: 48 },
    { label: "Daniel", value: "daniel" as BookName, chapterNumber: 12 },
    { label: "Hosea", value: "hosea" as BookName, chapterNumber: 14 },
    { label: "Joel", value: "joel" as BookName, chapterNumber: 3 },
    { label: "Amos", value: "amos" as BookName, chapterNumber: 9 },
    { label: "Obadiah", value: "obadiah" as BookName, chapterNumber: 1 },
    { label: "Jonah", value: "jonah" as BookName, chapterNumber: 4 },
    { label: "Micah", value: "micah" as BookName, chapterNumber: 7 },
    { label: "Nahum", value: "nahum" as BookName, chapterNumber: 3 },
    { label: "Habakkuk", value: "habakkuk" as BookName, chapterNumber: 3 },
    { label: "Zephaniah", value: "zephaniah" as BookName, chapterNumber: 3 },
    { label: "Haggai", value: "haggai" as BookName, chapterNumber: 2 },
    { label: "Zechariah", value: "zechariah" as BookName, chapterNumber: 14 },
    { label: "Malachi", value: "malachi" as BookName, chapterNumber: 4 }
  ],
  newTestament: [
    { label: "Matthew", value: "matthew" as BookName, chapterNumber: 28 },
    { label: "Mark", value: "mark" as BookName, chapterNumber: 16 },
    { label: "Luke", value: "luke" as BookName, chapterNumber: 24 },
    { label: "John", value: "john" as BookName, chapterNumber: 21 },
    { label: "Acts", value: "acts" as BookName, chapterNumber: 28 },
    { label: "Romans", value: "romans" as BookName, chapterNumber: 16 },
    { label: "1 Corinthians", value: "1corinthians" as BookName, chapterNumber: 16 },
    { label: "2 Corinthians", value: "2corinthians" as BookName, chapterNumber: 13 },
    { label: "Galatians", value: "galatians" as BookName, chapterNumber: 6 },
    { label: "Ephesians", value: "ephesians" as BookName, chapterNumber: 6 },
    { label: "Philippians", value: "philippians" as BookName, chapterNumber: 4 },
    { label: "Colossians", value: "colossians" as BookName, chapterNumber: 4 },
    { label: "1 Thessalonians", value: "1thessalonians" as BookName, chapterNumber: 5 },
    { label: "2 Thessalonians", value: "2thessalonians" as BookName, chapterNumber: 3 },
    { label: "1 Timothy", value: "1timothy" as BookName, chapterNumber: 6 },
    { label: "2 Timothy", value: "2timothy" as BookName, chapterNumber: 4 },
    { label: "Titus", value: "titus" as BookName, chapterNumber: 3 },
    { label: "Philemon", value: "philemon" as BookName, chapterNumber: 1 },
    { label: "Hebrews", value: "hebrews" as BookName, chapterNumber: 13 },
    { label: "James", value: "james" as BookName, chapterNumber: 5 },
    { label: "1 Peter", value: "1peter" as BookName, chapterNumber: 5 },
    { label: "2 Peter", value: "2peter" as BookName, chapterNumber: 3 },
    { label: "1 John", value: "1john" as BookName, chapterNumber: 5 },
    { label: "2 John", value: "2john" as BookName, chapterNumber: 1 },
    { label: "3 John", value: "3john" as BookName, chapterNumber: 1 },
    { label: "Jude", value: "jude" as BookName, chapterNumber: 1 },
    { label: "Revelation", value: "revelation" as BookName, chapterNumber: 22 }
  ]
};


export default bibleBooks;

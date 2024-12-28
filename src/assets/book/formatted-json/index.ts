import { BookName } from "@/types/book-type";

export type BookItemType = {
  type: string,
  chapterNumber: number,
  verseNumber: number,
  sectionNumber: number,
  value?: string
}

const getBook = (book: BookName) => {
  const json_file = import(`./all/${book}.json`).then(res => res.default);

  return json_file;
}

export async function getBookByChapter(book: BookName, chapter: number) {
  const currentBook = await getBook(book);

  // get next chapter index
  const nextChapter = currentBook.findIndex((item: BookItemType) => item.chapterNumber === (chapter + 1));

  // get current chapter index
  const currentChapter = currentBook.findIndex((item: BookItemType) => item.chapterNumber === chapter);


  // prev chapter last item
  const prevChapterItem = currentBook[currentChapter - 1];

  // current chapter last item
  const currentChapterItem = currentBook[nextChapter - 1];


  // checks if the  next chapter exists. If it does check if the current chapter last item is not equals to "paragraph text", if it's not, minus one index which is type => "paragraph text". If next chapter doesn't exist assign the last index to the length of the array.
  const nextChapterIndex = nextChapter !== -1 ? (currentChapterItem.type !== "paragraph text" ? nextChapter - 1 : nextChapter) : currentBook.length;

  // ...
  const currentChapterIndex = currentChapter !== -1 ? (prevChapterItem.type !== "paragraph text" ? currentChapter - 1 : currentChapter) : currentChapter


  return currentBook.slice(currentChapterIndex, nextChapterIndex);
}
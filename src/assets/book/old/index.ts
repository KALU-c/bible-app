import genesis from "./genesis.json";

type BookType = "genesis"

const allBooks = {
  genesis
};

export function getBookByChapter(book: BookType, chapter: number) {
  // Kal's algorithm

  // get next chapter index
  const nextChapter = allBooks[book].findIndex(item => item.chapterNumber === (chapter + 1));

  // get current chapter index
  const currentChapter = allBooks[book].findIndex(item => item.chapterNumber === chapter);


  // prev chapter last item
  const prevChapterItem = allBooks[book][currentChapter - 1];

  // current chapter last item
  const currentChapterItem = allBooks[book][nextChapter - 1];


  // checks if the  next chapter exists. If it does check if the current chapter last item is not equals to "paragraph text", if it's not, minus one index which is type => "paragraph text". If next chapter doesn't exist assign the last index to the length of the array.
  const nextChapterIndex = nextChapter !== -1 ? (currentChapterItem.type !== "paragraph text" ? nextChapter - 1 : nextChapter) : allBooks[book].length;

  // ...
  const currentChapterIndex = currentChapter !== -1 ? (prevChapterItem.type !== "paragraph text" ? currentChapter - 1 : currentChapter) : currentChapter


  return allBooks[book].slice(currentChapterIndex, nextChapterIndex);
}
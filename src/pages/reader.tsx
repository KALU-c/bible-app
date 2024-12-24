import { getBookByChapter } from "@/assets/book/old"
import { useState } from "react"

type VerseFocusType = {
  verse: number,
  isFocused: boolean
}

const Reader = () => {
  const [isFocused, setIsFocused] = useState<VerseFocusType>({
    verse: 0,
    isFocused: false
  });

  const book = getBookByChapter("genesis", 50);

  return (
    <div className="mx-96 py-4">
      {book.map((verse, index) => (
        <>
          {(verse.type === "paragraph text" || verse.type === "line text") && (
            <span
              key={index}
              className={`mb-1 cursor-pointer ${isFocused.verse === verse.verseNumber && "border-b border-dotted border-b-black"}`}
              onClick={() => setIsFocused({ verse: verse.verseNumber || 0, isFocused: true })}
            >
              <sup
                className={`
                  text-xs text-red-500 mr-1 
                  ${(verse.type === "line text" && verse.value === " ") && "hidden"}
                  ${(verse.sectionNumber !== 1 && "hidden")}
                `}
              >
                {verse.verseNumber}
              </sup>
              {verse.value}
            </span>
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

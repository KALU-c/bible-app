import { getBookByChapter } from "@/assets/book/old"
import { useSidebar } from "@/components/ui/sidebar"
import { useState } from "react"

type VerseFocusType = {
  verse: number,
  isFocused: boolean
}

const Reader = () => {
  const { open } = useSidebar();
  const [isFocused, setIsFocused] = useState<VerseFocusType>({
    verse: 0,
    isFocused: false
  });

  const book = getBookByChapter("genesis", 50);

  return (
    <div
      className="xl:mx-96 md:mx-16 sm:mx-4 mx-2 py-4"
      style={open ? { marginLeft: 200 } : { marginLeft: 384 }}
    >
      <h1 className="text-center text-base mb-8 font-semibold">GENESIS 50</h1>
      {book.map((verse, index) => (
        <>
          {(verse.type === "paragraph text" || verse.type === "line text") && (
            <span
              key={index}
              className={`mb-1 text-[17px] cursor-pointer ${isFocused.verse === verse.verseNumber && "border-b border-dotted border-b-black dark:border-b-white"}`}
              onClick={() => setIsFocused({ verse: verse.verseNumber || 0, isFocused: true })}
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
